import { getProductById } from "@/library/actions"
import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart, Eye, Share2, ChevronsDown, ChevronsUp, Activity, FilePieChart } from 'lucide-react';
type Params = {
    params: {
        id: string
    }
}
export default async function ProductDetails({ params: { id } }: Params) {

    const product = await getProductById(id);
    if (!product) redirect('/')
    return (
        <div className="bg-black">
            <div className="pt-1">
                <nav className="flex ml-10" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                </svg>
                                <Link href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Overview</Link>
                            </div>
                        </li>
                    </ol>
                </nav>
                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            src={product.image}
                            alt={product.image}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="mt-4 ">
                        {/* <h2 className=" text-gray-900">Product information</h2> */}
                        <h1 className="text-2xl text-white-700 text-opacity-50 sm:text-3xl">{product.title}</h1>


                        <div className="flex justify-between ">
                            <Link href={product.url} className="text-sm text-blue-600 dark:text-blue-500 hover:underline mt-1">Follow the link to know more</Link>
                            <div className="flex gap-3">
                                <div className="cursor-pointer ">
                                    <Heart color="red" />
                                </div>
                                <div className="cursor-pointer ">
                                    <Share2 color="green" />
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="mt-2">
                            <h3 className="text-xs dark:text-purple-300">Reviews</h3>
                            <div className="flex items-center">
                                <p className="dark:text-indigo-300 text-sm">4.7 out of 5 stars</p>
                                <div className="ml-2 text-xs font-medium text-indigo-600 hover:text-indigo-500">
                                    (70 reviews)
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="w-full p-4 text-center rounded-lg shadow sm:p-8 dark:bg-black-500 dark:border-blue-900">
                                <div className="grid grid-cols-2 gap-2">

                                    <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700  focus:ring-gray-300 text-white rounded-lg flex items-center space-x-0.5 px-4 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-gray-700">
                                        <ChevronsDown className="mr-2" />
                                        <div className="text-left">
                                            <div className="mb-1 text-xs">Lowest Price</div>
                                            <div className="-mt-1 font-sans text-lg font-semibold flex">
                                                <div className="text-xs mr-1">{product.currancy}</div>
                                                {product.lowestPrice}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700  focus:ring-gray-300 text-white rounded-lg flex items-center space-x-0.5 px-4 py-2.5 dark:bg-red-900 dark:hover:dark:bg-red-600 dark:focus:ring-gray-700">
                                        <ChevronsUp className="mr-2" />
                                        <div className="text-left">
                                            <div className="mb-1 text-xs">Hightest Price</div>
                                            <div className="-mt-1 font-sans text-lg font-semibold flex">
                                                <div className="text-xs mr-1">{product.currancy}</div>
                                                {product.highestPrice}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700  focus:ring-gray-300 text-white rounded-lg flex items-center space-x-0.5 px-4 py-2.5 dark:bg-yellow-900 dark:hover:bg-yellow-600 dark:focus:ring-gray-700">
                                        <FilePieChart className="mr-2" />
                                        <div className="text-left">
                                            <div className="mb-1 text-xs">Current Price</div>
                                            <div className="-mt-1 font-sans text-lg font-semibold flex">
                                                <div className="text-xs mr-1">{product.currancy}</div>
                                                {product.currentPrice}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700  focus:ring-gray-300 text-white rounded-lg flex items-center space-x-0.5 px-4 py-2.5 dark:bg-indigo-900 dark:hover:bg-indigo-600 dark:focus:ring-gray-700">
                                        <Activity className="mr-2" />
                                        <div className="text-left">
                                            <div className="mb-1 text-xs">Average Price</div>
                                            <div className="-mt-1 font-sans text-lg font-semibold flex">
                                                <div className="text-xs mr-1">{product.currancy}</div>
                                                {(product.lowestPrice + product.highestPrice) / 2}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Track Product
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        {/* <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1> */}
                    </div>

       
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.lowestPrice}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">

                                </div>
                                <p className="sr-only">4.7 out of 5 stars</p>
                                <a href="/" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    70 reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                            </div>
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </a>
                                </div>

                            </div>


                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8 lg:pt-6">
                        <div>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
