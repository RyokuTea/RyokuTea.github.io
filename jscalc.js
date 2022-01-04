function FindInch()
{
   fi1.resultAAH.value = (fi1.resolutionH.value * fi1.PixelFormat.value * fi1.pixelH.value * (10**-3));
   fi1.resultAAV.value = (fi1.resolutionV.value * fi1.pixelV.value /1000);
   fi1.result.value = Math.round((Math.sqrt((fi1.resultAAH.value ** 2) + (fi1.resultAAV.value**2)) / 25.4)*1000)/1000;
}

function threeTimes()
{
   fi1.pixelV.value = (fi1.pixelH.value * 3);
}

function Calculate()
{
   frm1.result.value = (frm1.firstValue.value * frm1.secondValue.value);
}

function Clear()
{
   frm1.firstValue.value = "";
   frm1.secondValue.value="";
   frm1.result.value="";
}