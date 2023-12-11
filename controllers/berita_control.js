import Berita from "../models/berita_models.js"

export const getBerita = async(req, res) => {
    try {
        const berita = await Berita.findAll()
        res.json(berita)
    } catch (error) {
        console.log(error)
    }
}

export const getBeritaMental = async(req, res) => {
    try {
        const beritaMental = await Berita.findAll({
            where: {
                kategori: 'mentalhealth'
            }
        })

        if (beritaMental.length === 0) {
            return res.status(404).json({ message: 'Berita Mental Health tidak ditemukan.' });
        }

        res.json(beritaMental)
    } catch (error) {
        console.log(error)
    }
}

export const getBeritaLife = async(req, res) => {
    try {
        const beritaLife = await Berita.findAll({
            where: {
                kategori: 'lifestyle'
            }
        })

        if (beritaLife.length === 0) {
            return res.status(404).json({ message: 'Berita Lifestyle tidak ditemukan.' });
        }

        res.json(beritaLife)
    } catch (error) {
        console.log(error)
    }
}

export const getBeritaFood = async(req, res) => {
    try {
        const beritaFood = await Berita.findAll({
            where: {
                kategori: 'foodhealth'
            }
        })

        if (beritaFood.length === 0) {
            return res.status(404).json({ message: 'Berita Food Health tidak ditemukan.' });
        }

        res.json(beritaFood)
    } catch (error) {
        console.log(error)
    }
}

export const tambahBerita = async(req, res) => {
    const { kategori, penulis, judul, gambar, deskripsi } = req.body

    try {
        await Berita.create({
            kategori: kategori,
            author: penulis,
            title: judul,
            urlToImage: gambar,
            content: deskripsi
        })
        res.status(201).json({ msg: "Tambah berita berhasil" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}