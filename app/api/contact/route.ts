import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  csrf: z.string(),
});

// Rate limiting map (in a real app, use Redis or similar)
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

// Rate limit: 5 requests per minute
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // 1. Get client IP for rate limiting
    const ip = request.ip || "unknown";

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
    const headersList = headers();
    const csrfCookie = headersList.get("cookie")?.match(/csrf-token=([^;]+)/);
    const csrfToken = csrfCookie?.[1];

    if (!csrfToken || data.csrf !== csrfToken) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      );
    }

    // 5. Validate form data
    const validatedData = contactFormSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // 6. Process the form data (in a real app, send email, save to database, etc.)
    // This is a mock implementation
    console.log("Form submission:", validatedData.data);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 7. Return success response
    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Return error response
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
