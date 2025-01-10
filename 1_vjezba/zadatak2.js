var niz = ["pr,vi","drugi","tre,ci"]

function lomljenje(niz, char)
{
    for (var item in niz)
    {
        niz[item] = niz[item].split(char)
    }
    console.log(niz)
}

lomljenje(niz, ",")