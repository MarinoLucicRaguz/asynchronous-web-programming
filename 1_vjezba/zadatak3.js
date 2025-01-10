function zbroji(broj1, broj2 )
{
    return broj1+broj2;
}

function oduzmi(broj1,broj2)
{
    return broj1-broj2;
}

function pomnozi(broj1,broj2)
{
    return broj1*broj2;
}

function podijeli(broj1,broj2)
{
    return broj1/broj2;
}

function clozure(elem, br1,br2)
{
    if (elem === '+') return zbroji(br1,br2);
    if (elem === '-') return oduzmi(br1,br2);
    if (elem === '*') return pomnozi(br1,br2);
    if (elem === '/') return podijeli(br1,br2);
}

console.log(clozure('+',2,5));