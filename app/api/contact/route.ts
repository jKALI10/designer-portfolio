import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//import { Resend } from "resend";

// Initialize Resend
//const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  csrf: z.string().min(1, "CSRF token is required"),
});

// Rate limiting map (in a real app, use Redis or similar)
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

// Rate limit: 5 requests per minute
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // 1. Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") || "unknown";

    // 2. Check rate limit
    const now = Date.now();
    const ipData = ipRequestCounts.get(ip) || { count: 0, timestamp: now };

    // Reset count if outside window
    if (now - ipData.timestamp > RATE_LIMIT_WINDOW_MS) {
      ipData.count = 0;
      ipData.timestamp = now;
    }

    // Check if rate limited
    if (ipData.count >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Increment count
    ipData.count++;
    ipRequestCounts.set(ip, ipData);

    // 3. Get form data
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // 4. Validate CSRF token
    const csrfCookie = request.cookies.get("csrf-token");
    const csrfToken = csrfCookie?.value;

    if (!csrfToken || data.csrf !== csrfToken) {
      console.log("CSRF validation failed:", {
        cookieToken: csrfToken,
        formToken: data.csrf,
        hasCookie: !!csrfCookie,
        formKeys: Object.keys(data),
      });
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      );
    }

    // 5. Validate form data
    const validatedData = contactFormSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: validatedData.error.format(),
        },
        { status: 400 }
      );
    }

    // 6. Send email using Resend
    try {
      //await resend.emails.send({
       // from: process.env.FROM_EMAIL || "onboarding@resend.dev", //
        //to: process.env.RECIPIENT_EMAIL || "ermiasGD1010@gmail.com", //
        //subject: `New Contact Form Submission - ${validatedData.data.projectType}`,
        //html: `
          //<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            //<h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
           //   New Contact Form Submission
            //</h2>
            
            //<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              //<p><strong>Name:</strong> ${validatedData.data.firstName} ${validatedData.data.lastName}</p>
             // <p><strong>Email:</strong> <a href="mailto:${validatedData.data.email}">${validatedData.data.email}</a></p>
              //<p><strong>Project Type:</strong> ${validatedData.data.projectType}</p>
            //</div>
            
           // <div style="margin: 20px 0;">
             // <h3 style="color: #333;">Message:</h3>
              //<div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #8b5cf6; border-radius: 4px;">
               // ${validatedData.data.message.replace(/\n/g, "<br>")}
              //</div>
           // </div>
            
            //<hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            //<p style="color: #666; font-size: 12px; text-align: center;">
              //Sent from your portfolio contact form
            //</p>
          //</div>
        //`,
      //});

      console.log(
        "Email sent successfully via Resend to:",
        process.env.RECIPIENT_EMAIL
      );
    } catch (emailError) {
      console.error("Failed to send email via Resend:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Return error response
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
