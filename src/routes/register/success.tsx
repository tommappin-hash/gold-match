import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register/success")({
  component: RegistrationSuccess,
});

function RegistrationSuccess() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-10 w-10 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-3 text-gray-600">
            Thank you — your listing is pending. We'll notify you when it's
            approved after payment.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Your one-time listing fee has been processed.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900">What happens next?</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                1
              </span>
              We'll review your practice listing within 1-2 business days.
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                2
              </span>
              Once approved, your listing goes live on GoldMatch and patients
              can find you.
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                3
              </span>
              You'll start receiving connection requests from patients seeking
              gold restorations.
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dentists"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600"
          >
            Browse Dentists
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
