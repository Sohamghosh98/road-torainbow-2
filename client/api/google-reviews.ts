const PLACE_ID = "ChIJV8qoI_Kb-DkR_NVqiX6Xlok";

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GOOGLE_MAPS_API_KEY is missing",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,reviews",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google Places API error:", data);

      return new Response(
        JSON.stringify({
          error: "Google Places API error",
          details: data,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const reviews = (data.reviews ?? []).map(
      (review: any) => ({
        name:
          review.authorAttribution?.displayName ??
          "Google reviewer",

        photoUri:
          review.authorAttribution?.photoUri,

        rating:
          review.rating ?? 0,

        text:
          review.text?.text ??
          review.originalText?.text ??
          "",

        relativePublishTimeDescription:
          review.relativePublishTimeDescription,

        googleMapsUri:
          review.googleMapsUri,
      })
    );

    return new Response(
      JSON.stringify({
        placeName:
          data.displayName?.text ??
          "Manisha Dhar",

        rating:
          data.rating ?? null,

        userRatingCount:
          data.userRatingCount ?? null,

        reviews,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error(
      "Google Reviews server error:",
      error
    );

    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}