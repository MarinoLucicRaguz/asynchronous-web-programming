function pozivanjeipamcenje()
{
    let broj = 0;
    let pamcenje =[]

    return function unutra(niz)
    {
        broj++;
        pamcenje.push(niz)
        console.log(pamcenje, broj)
    }
}

const a = pozivanjeipamcenje(["a","b",123])

a(["fdsš",true])
a(["233123dsš",true])
a(["fdsš",true,2323])