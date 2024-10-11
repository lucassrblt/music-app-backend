import express from 'express'
import supabase from './supabase.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())

app.get('/popular', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('popular')
      .select("*")

    if (error) {
      console.log('Erreur Supabase:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log('Données récupérées:', data)
    
    if (data.length === 0) {
      console.log('Aucune donnée trouvée dans la table "popular"')
    }

    // Tentez de récupérer le compte total des lignes pour vérification
    const { count, error: countError } = await supabase
      .from('popular')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.log('Erreur lors du comptage:', countError)
    } else {
      console.log('Nombre total de lignes dans la table:', count)
    }

    res.json(data)
  } catch (e) {
    console.log('Erreur inattendue:', e)
    res.status(500).json({ error: "Une erreur inattendue s'est produite" })
  }
})


app.get("/search", async (req, res) => {
  try{
    const keyword = req.query.keyword
    res.json({message: 'keyword received'})
  }catch(errors){
    throw new errors
  }
})

app.get("/token", async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", "436925aa3cd844cdb97bb22e105db31c");
    params.append("client_secret", "d9cf7f1670f143c888b49012aeae160a");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers : {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    })
    const data = await response.json()
    res.json(data)
  }catch(e){
    console.log(e)

  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})