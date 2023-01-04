import * as React from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import lunch from '../assets/lunch.jpeg'
import Error from '../components/Error'
import Loading from '../components/Loading'
//
import useSWR from "swr"
//
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const navigation = [
    { name: 'Rockets', href: '#' },
    { name: 'Capsules', href: '#' },
    { name: 'Research', href: '#' },
    { name: 'SpaceX', href: '#' },
]


const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [pageIndex, setPageIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);

    // open modal
    const handleOpen = (item) => {
        setModalData(item);
        setOpen(true)
    }

    // close modal
    const handleClose = () => {
        setModalData(null)
        setOpen(false)
    }

    // fetch data
    const { data, error, isLoading } =
        useSWR(`https://api.spacexdata.com/latest/capsules/?query=${pageIndex}`, fetcher);

    // console.log(data)

    if (isLoading) return <Loading />
    if (error) return <Error />

    return (
        <div className="isolate bg-gray-200 pb-5">
            <div className="absolute inset-0 -z-10 overflow-hidden blur-lg sm:top-[-20rem]">
                {/** Hero Image */}
                <img src={lunch} className="w-full h-full" />
            </div>
            <div className="px-6 pt-6 lg:px-8">
                <div>
                    <nav className="flex h-9 items-center justify-between" aria-label="Global">
                        <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                            <a href="#" className="-m-1.5 p-1.5">
                                {/** Logo */}
                                <h3 className="h-8 text-white">Logo</h3>
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                {/** Toggle Mobile Menu */}
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className="font-semibold text-white hover:text-gray-900">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                            <a
                                href="#"
                                className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-white hover:ring-gray-900/20"
                            >
                                Log in
                            </a>
                        </div>
                    </nav>
                    <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                            <div className="flex h-9 items-center justify-between">
                                <div className="flex">
                                    <a href="#" className="-m-1.5 p-1.5">
                                        {/** Logo */}
                                        <h3 className="h-8 text-white">Logo</h3>
                                    </a>
                                </div>
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {/** Close Menu */}
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </div>
            </div>
            {/** Hero Section */}
            <main>
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl pt-10 pb-32 sm:pt-48 sm:pb-15">
                        <div>
                            <h1 className="text-4xl text-gray-200 font-bold tracking-tight sm:text-center sm:text-6xl">
                                SpaceX Data Search Center
                            </h1>

                            {/** Search Form */}
                            <form className="mt-8 flex gap-x-4 sm:justify-center">
                                <input
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="inline-block w-full py-2 rounded-full bg-gray-200 focus:border-gray-300 hover:focus:border-gray-700 hover:border-gray-300 focus:ring-0 text-sm px-5"
                                    id="search"
                                    type="text"
                                    name="search"
                                    placeholder="Search Capsule Data with type or serial..."
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </main>


            {/** Data grid */}
            <div className="bg-gray-200">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Capsules</h2>

                    <div className="flex flex-col">
                        {/** Card Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4">
                            {data?.filter((capsule) => capsule?.type?.toLowerCase()?.includes(searchTerm) || capsule?.serial?.toLowerCase()?.includes(searchTerm)
                            )?.map((capsule) =>

                                <div key={capsule?.id} onClick={() => handleOpen(capsule)} className="flex items-start p-4 rounded-xl shadow-lg bg-white cursor-pointer">
                                    <div className="flex items-center justify-center bg-blue-50 h-12 w-12 rounded-full border border-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="font-semibold">{capsule?.serial}</h2>
                                        <p className="mt-2 text-sm text-gray-500">{capsule?.type}</p>
                                    </div>
                                </div>

                            )}
                        </div>

                        {/** Modal Pop-Up */}
                        <Modal
                            open={open}
                            onClose={() => handleClose()}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>

                                <Typography variant="h6" component="h2">
                                    Serial: {modalData?.serial}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    Last Updated: {modalData?.last_update ? modalData?.last_update : "Data Not Avaliable"}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    Status: {modalData?.status}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    Type: {modalData?.type}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    Launches -
                                </Typography>

                                <List>
                                    {modalData?.launches?.length === 0 ? "Data Not Avaliable" : modalData?.launches?.map((listItem, idx) => (
                                        <ListItem key={idx} disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={listItem} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Modal>

                    </div>
                </div>
            </div>

            {/** Pagination Buttons */}
            <div className='flex justify-center space-x-4'>
                <a
                    onClick={() => setPageIndex(pageIndex - 1)}
                    className="inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-blue-700 hover:ring-blue-700 cursor-pointer"
                >
                    Previous
                </a>
                <a
                    onClick={() => setPageIndex(pageIndex + 1)}
                    className="inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-blue-700 hover:ring-blue-700 cursor-pointer"
                >
                    Next
                </a>
            </div>
        </div>
    )
}


export default Home;