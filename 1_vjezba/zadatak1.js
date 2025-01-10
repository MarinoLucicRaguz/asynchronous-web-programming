var niz = ["test",123, true, 43.12, ()=> {}, {}, [1,2,3]]

function tip(element)
{
    return typeof(element);
}

function ispisiTypeof(funk, niz) {
    for (var item of niz)
    {
        console.log(funk(item));
    }
}

ispisiTypeof(tip, niz)