import { getProductById, getSimilarProduct } from "@/library/actions"
import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart, GanttChartSquare, Share2, ChevronsDown, ChevronsUp, Activity, FilePieChart, Star, PercentCircle, ExternalLink } from 'lucide-react';
import TrackProd from "@/components/trackProd";
import DescriptionProvider from "@/components/descriptionProvider";
import Image from 'next/image';
import Charts from "@/components/charts";

type Params = {
    params: {
        id: string
    }
}

export default async function ProductDetails({ params: { id } }: Params) {

    const product = await getProductById(id);
    if (!product) redirect('/')
    const similarProduct = await getSimilarProduct(id)

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
                        <Image
                            width={624}
                            height={624}
                            src={product.image}
                            alt={product.image}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="mt-4 ">
                        {/* <h2 className=" text-gray-900">Product information</h2> */}
                        <h1 className="text-2xl text-white-700 text-opacity-50 sm:text-3xl">{product.title}</h1>
                        <div className="flex justify-between ">
                            <div className="mt-2">
                                <span className="bg-pink-500 text-pink-800 text-xs font-medium inline-flex items-center px-2.5 py-0.1 rounded-full dark:bg-pink-300 dark:text-pink-800 border border-pink-400">
                                    <Star className="w-4 mr-1" />
                                    4.7 out of 5
                                </span>
                                <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.1 rounded-full dark:bg-yellow-300 dark:text-yellow-800 border border-yellow-400">
                                    <GanttChartSquare className="w-4 mr-1" />
                                    Review 700+
                                </span>
                                <span className="ml-1 bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.1 rounded-full dark:bg-green-300 dark:text-green-800 border border-green-400">
                                    <PercentCircle className="w-4 mr-1" />
                                    Discount {product.discount}%
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <Link href={product.url} target="_blank" className="text-sm text-blue-600 dark:text-blue-500 hover:underline"><ExternalLink /></Link>
                                <div className="cursor-pointer ">
                                    <Heart color="red" />
                                </div>
                                <div className="cursor-pointer ">
                                    <Share2 color="green" />
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}


                        <div className="mt-3">
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

                            {id !== undefined && <TrackProd productId={id.toString()} />}

                        </div>
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-5 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <p className="text-blue-900 text-xl">Description</p>
                    </div>


                    {product !== undefined &&  <Charts />}

                    <div className="py-5 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8 lg:pt-6">
                        <div>
                            <div className="space-y-6">
                               {product.description !== undefined &&  <DescriptionProvider description={product.description}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {similarProduct && similarProduct?.length > 0 && (
                        similarProduct.map((item,i) =>
                        (
                            <Link href={`/products/${item._id}`} key={i} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Image width={624} height={624} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.image} alt={item.title} />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.slice(0, 25)}...</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description.slice(0, 90)}...</p>
                                    <div className="mt-2">
                                        <span className="bg-pink-500 text-pink-800 text-xs font-medium inline-flex items-center px-2.5 py-0.1 rounded-full dark:bg-pink-300 dark:text-pink-800 border border-pink-400">
                                            <Star className="w-4 mr-1" />
                                            4.7 out of 5
                                        </span>
                                        <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.1 rounded-full dark:bg-yellow-300 dark:text-yellow-800 border border-yellow-400">
                                            <GanttChartSquare className="w-4 mr-1" />
                                            Review 700+
                                        </span>
                                        <span className="ml-1 bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.1 rounded-full dark:bg-green-300 dark:text-green-800 border border-green-400">
                                            <PercentCircle className="w-4 mr-1" />
                                            Discount {item.discount}%
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
