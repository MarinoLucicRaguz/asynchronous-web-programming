const { vasaFunkcija } = require(".");

async function pozovieksportanufunkciju()
{
    try {
        const data = await vasaFunkcija();
        console.log(data);
    }
    catch (err)
    {
        console.log("Dogodila se pogreska: ",err);
    }
}

pozovieksportanufunkciju();
