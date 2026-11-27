const dummyMenus = [
//Nasi Kebuli
    {
        id: 'KB001',
        name: 'Nasi Kebuli Dada',
        category: 'Paket Nasi Kebuli',
        price: 23000,
        image: '/images/menu/nasi-kebuli-dada.png',
        isAvailable: true,
    },
    {
        id: 'KB002',
        name: 'Nasi Kebuli Sayap',
        category: 'Paket Nasi Kebuli',
        price: 19000,
        image: '/images/menu/nasi-kebuli-sayap.png',
        isAvailable: true,
    },
    {
        id: 'KB003',
        name: 'Nasi Kebuli Paha',
        category: 'Paket Nasi Kebuli',
        price: 21000,
        image: '/images/menu/nasi-kebuli-paha.png',
        isAvailable: true,
    },
    {
        id: 'KB004',
        name: 'Nasi Kebuli Kulit',
        category: 'Paket Nasi Kebuli',
        price: 15000,
        image: '/images/menu/nasi-kebuli-kulit.png',
        isAvailable: true,
    },
    {
        id: 'KB005',
        name: 'Nasi Kebuli',
        category: 'Paket Nasi Kebuli',
        price: 8000,
        image: '/images/menu/nasi-kebuli.png',
        isAvailable: true,
    },

    //Nasi Putih

    {
        id: 'NP001',
        name: 'Nasi Putih Dada',
        category: 'Paket Nasi Putih',
        price: 18000,
        image: '/images/menu/nasi-putih-dada.png',
        isAvailable: true,
    },
    {
        id: 'NP002',
        name: 'Nasi Putih Sayap',
        category: 'Paket Nasi Putih',
        price: 14000,
        image: '/images/menu/nasi-putih-sayap.png',
        isAvailable: true,
    },
    {
        id: 'NP003',
        name: 'Nasi Putih Paha',
        category: 'Paket Nasi Putih',
        price: 16000,
        image: '/images/menu/nasi-putih-paha.png',
        isAvailable: true,
    },
    {
        id: 'NP004',
        name: 'Nasi Putih Kulit',
        category: 'Paket Nasi Putih',
        price: 10000,
        image: '/images/menu/nasi-putih-kulit.png',
        isAvailable: true,
    },
    {
        id: 'NP005',
        name: 'Nasi Putih',
        category: 'Paket Nasi Putih',
        price: 4000,
        image: '/images/menu/nasi-putih.png',
        isAvailable: true,
    },

    //Add On

    {
        id: 'AO001',
        name: 'Sambal Hijau',
        category: 'Add On',
        price: 5000,
        image: '/images/menu/sambal-hijau.png',
        isAvailable: true,
    },
    {
        id: 'AO002',
        name: 'Sambal Bawang',
        category: 'Add On',
        price: 4000,
        image: '/images/menu/sambal-bawang.png',
        isAvailable: true,
    },
    {
        id: 'AO003',
        name: 'Cheese',
        category: 'Add On',
        price: 4000,
        image: '/images/menu/cheese.png',
        isAvailable: true,
    },
    {
        id: 'AO004',
        name: 'Tartar',
        category: 'Add On',
        price: 5000,
        image: '/images/menu/tartar.png',
        isAvailable: true,
    },
    {
        id: 'AO005',
        name: 'Garlic',
        category: 'Add On',
        price: 5000,
        image: '/images/menu/garlic.png',
        isAvailable: true,
    },
];

export const getMenu = async () => {
    return dummyMenus;
};
