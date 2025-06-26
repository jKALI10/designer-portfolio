// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

// export function ContactForm() {
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [csrfToken, setCsrfToken] = useState("");

//   // Fetch CSRF token on component mount
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         const response = await fetch("/api/csrf");
//         if (response.ok) {
//           const data = await response.json();
//           // Get the token from the response or cookie
//           const token = getCsrfTokenFromCookie();
//           setCsrfToken(token);
//         }
//       } catch (error) {
//         console.error("Failed to fetch CSRF token:", error);
//       }
//     };

//     fetchCsrfToken();
//   }, []);

//   // Helper function to get CSRF token from cookie
//   const getCsrfTokenFromCookie = () => {
//     const cookies = document.cookie.split(";");
//     for (const cookie of cookies) {
//       const [name, value] = cookie.trim().split("=");
//       if (name === "csrf-token") {
//         return value;
//       }
//     }
//     return "";
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     try {
//       const formData = new FormData(event.currentTarget);

//       // Add CSRF token to form data
//       formData.set("csrf", csrfToken);

//       const response = await fetch("/api/contact", {
//         method: "POST",
//         body: formData,
//         credentials: "include", // Include cookies for CSRF validation
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast({
//           title: "Message sent!",
//           description: "Thank you for your message. I'll get back to you soon.",
//         });

//         // Reset form
//         event.currentTarget.reset();
//       } else {
//         toast({
//           title: "Error",
//           description: data.error || "Something went wrong. Please try again.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label
//             htmlFor="first-name"
//             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//           >
//             First name
//           </label>
//           <input
//             id="first-name"
//             name="firstName"
//             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             placeholder="Enter your first name"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label
//             htmlFor="last-name"
//             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//           >
//             Last name
//           </label>
//           <input
//             id="last-name"
//             name="lastName"
//             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             placeholder="Enter your last name"
//             required
//           />
//         </div>
//       </div>
//       <div className="space-y-2">
//         <label
//           htmlFor="email"
//           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//         >
//           Email
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           placeholder="Enter your email"
//           required
//         />
//       </div>
//       <div className="space-y-2">
//         <label
//           htmlFor="project-type"
//           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//         >
//           Project Type
//         </label>
//         <select
//           id="project-type"
//           name="projectType"
//           defaultValue=""
//           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           required
//         >
//           <option value="" disabled>
//             Select project type
//           </option>
//           <option value="poster-design">Poster Design</option>
//           <option value="logo-design">Logo Design</option>
//           <option value="print">Print Design</option>
//           <option value="illustration">Illustration</option>
//           <option value="other">Other</option>
//         </select>
//       </div>
//       <div className="space-y-2">
//         <label
//           htmlFor="message"
//           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//         >
//           Message
//         </label>
//         <textarea
//           id="message"
//           name="message"
//           className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           placeholder="Tell me about your project..."
//           required
//         ></textarea>
//       </div>
//       <Button
//         type="submit"
//         className="w-full"
//         size="lg"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? "Sending..." : "Send Message"}
//       </Button>
//     </form>
//   );
// }
