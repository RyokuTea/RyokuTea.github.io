function FindInch()
{
   fi1.resultAAH.value = (fi1.resolutionH.value * fi1.PixelFormat.value * fi1.subPixelH.value * (10**-3));
   fi1.resultAAV.value = (fi1.resolutionV.value * fi1.pixelV.value /1000);
   fi1.result.value = Math.round((Math.sqrt((fi1.resultAAH.value ** 2) + (fi1.resultAAV.value**2)) / 25.4)*1000)/1000;
   PPI()
}

function subPixelTimes()
{
   fi1.pixelV.value = (fi1.subPixelH.value * 3);
   PPI()
}

function PPI()
{
   fi1.PPIH.value = Math.round((25.4/(fi1.subPixelH.value*fi1.PixelFormat.value)*10**3));
   fi1.PPIV.value = Math.round((25.4/fi1.pixelV.value*10**3));
}

function Clear()
{
   const clearLists = [fi1.resolutionH, fi1.PixelFormat, fi1.resolutionV, fi1.subPixelH, fi1.pixelV, fi1.PPIH, fi1.PPIV, fi1.resultAAH, fi1.resultAAV, fi1.result];

   clearLists.forEach((clearList)=>{
      if(clearList.name.includes("PPI")){
         clearList.value = "-";
      } else if(clearList.name.includes("PixelFormat")) {
         clearList.value = 3;
      } else {
         clearList.value = "";
      }
   });

}

/*
function Calculate()
{
   frm1.result.value = (frm1.firstValue.value * frm1.secondValue.value);
}
*/