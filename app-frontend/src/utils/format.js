export const formatRupiah = (value) =>
    value === null || value === undefined ? 'Harga belum tersedia': new Intl.NumberFormat('id-ID', 
        {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);