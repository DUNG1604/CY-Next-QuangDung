"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <div className="lg:px-24 lg:py-10 md:py-10 md:px-44 px-4 py-10 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            {/* Left Section */}
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <h1 className="my-2 text-gray-800 font-bold text-[30px]">
                        Welcome to Andrew&apos;s Shop
                    </h1>
                    <p className="my-2 text-gray-800">
                        Discover an incredible variety of high-quality products from around the globe. At Andrew&apos;s Shop, we are
                        committed to bringing you only the best items, from fashion to electronics, with a focus on quality,
                        affordability, and convenience. Start your journey with us and find something special today!
                    </p>
                    <Link href="/product">
                        <button
                            className="sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                        >
                            Go Shopping
                        </button>
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-[600px] h-[300px]">
                <img
                    className="w-full h-full object-cover"
                    src="https://i.ibb.co/ck1SGFJ/Group.png"
                    alt="Shopping Illustration"
                />
            </div>
        </div>
    );
}
