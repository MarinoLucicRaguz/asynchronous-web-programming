var niz = [1,2,-33,4,5,6,7,8,-213,52,-32]

function funkcija(niz)
{
    let parni =[]
    let neparni =[]

    parni = niz.filter(n=>n%2==0)
    
    neparni = niz.filter(n=>n%2!=0)
   

    parni.sort();
    neparni.sort();

    return {parni,neparni}
}

console.log(funkcija(niz))