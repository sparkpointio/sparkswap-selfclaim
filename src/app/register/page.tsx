import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold tracking-tight text-gray-400">
        Welcome, project owner
      </h1>
      <h2 className="text-3xl tracking-tight text-gray-500">
        Create self-claim airdrop
      </h2>
      <div className="w-52 mx-auto mt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Connect wallet
        </button>
      </div>
      <div className="w-5/6 mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">
            Token Address
          </label>
          <input
            type="text"
            id="tokenAddress"
            className="w-full px-3 py-2 border rounded-md"
            value="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2 font-medium">
          List of Addresses in CSV
          </label>
          <textarea
            id="message"
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            value={"0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e, 145 \n0x8A672715e042f6e9d9B25C2ce9F84210e8206EF1, 1.069 \n0xC4515C02c334155bc60d86BD6F1119f58ea136e2, 10.81 \n0xe270bc73d658cbd72f721cb8c649aebf91b98d2b, 0.058"}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </main>
  );
}