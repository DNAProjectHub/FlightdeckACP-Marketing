const API_KEY = process.env.MAILCHIMP_API_KEY || "";
const LIST_ID = process.env.MAILCHIMP_LIST_ID || "";
const SERVER = process.env.MAILCHIMP_SERVER || "us21";

interface SubscribeParams {
  email: string;
  firstName?: string;
  whatBuilding?: string;
}

export async function subscribe({ email, firstName, whatBuilding }: SubscribeParams) {
  const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName || "",
        BUILDING: whatBuilding || "",
      },
      tags: ["source:website"],
    }),
  });

  if (response.ok) return { success: true };

  const data = await response.json();
  // Duplicate subscriber — treat as success
  if (data.title === "Member Exists") return { success: true };

  throw new Error(data.detail || "Subscription failed");
}
