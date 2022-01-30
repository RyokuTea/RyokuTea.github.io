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

function calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2){
   var trials = 20000; // 試行回数
   var t_inner1 = 0; // 第1三角形内の点の数
   var t_inner2 = 0; // 第2三角形内の点の数
   
   /*
   var indexs = [indexA, indexB, indexC];
   for(var j=0;j<indexs.length;j++){
      console.log(indexs[j]);
   }
   console.log(indexs[2][0]);
   */
   for(var i = 0; i<trials; i++){
      var x = Math.random(); // 0 ~ 1.0の乱数
      var y = Math.random(); // 0 ~ 1.0の乱数

      var a = slop(indexA1, indexB1);
      var b = intercept(indexA1, a);
      var idealy = linearFunction(a, x, b);
      var anotherPointX = linearFunction(a, indexC1[0], b);
      var anotherPointY = indexC1[1];

      if(checkTorF(y, idealy, anotherPointX, anotherPointY)){
         a = slop(indexB1, indexC1);
         b = intercept(indexB1, a);
         idealy = linearFunction(a, x, b);
         anotherPointX = linearFunction(a, indexA1[0], b);
         anotherPointY = indexA1[1];

         if(checkTorF(y,idealy,anotherPointX,anotherPointY)){
            a = slop(indexC1, indexA1);
            b = intercept(indexC1, a);
            idealy = linearFunction(a, x, b);
            anotherPointX = linearFunction(a, indexB1[0], b);
            anotherPointY = indexB1[1];

            if(checkTorF(y,idealy, anotherPointX,anotherPointY)){
               t_inner1++;

               a = slop(indexA2, indexB2);
               b = intercept(indexA2, a);
               idealy = linearFunction(a, x, b);
               anotherPointX = linearFunction(a, indexC2[0], b);
               anotherPointY = indexC2[1];

               if(checkTorF(y, idealy, anotherPointX,anotherPointY)){
                  a = slop(indexB2, indexC2);
                  b = intercept(indexB2, a);
                  idealy = linearFunction(a, x, b);
                  anotherPointX = linearFunction(a, indexA2[0], b);
                  anotherPointY = indexA2[1];

                  if(checkTorF(y, idealy, anotherPointX,anotherPointY)){
                     a = slop(indexC2, indexA2);
                     b = intercept(indexC2, a);
                     idealy = linearFunction(a, x, b);
                     anotherPointX = linearFunction(a, indexB2[0], b);
                     anotherPointY = indexB2[1];

                     if(checkTorF(y, idealy, anotherPointX,anotherPointY)){
                        t_inner2++;
                     }
                  }
               }
            }
         }
      }
   }

   // 計算結果
   var result1 = t_inner1 / trials;
   var result2 = t_inner2 / trials;
   var ratio = (result2 / result1)*100;
   return Math.round(ratio*100)/100;
}

function slop(index1, index2){
   return (index2[1]-index1[1]) / (index2[0]-index1[0]);
}

function intercept(index1, a){
   return index1[1] - a * index1[0];
}

function linearFunction(a, x, b){
   return a*x+b;
}

function checkTorF(y, idealy, anotherPointX, anotherPointY){
   if(anotherPointY<anotherPointX){
      return y<=idealy;
   } else {
      return y>=idealy;
   }
}

function arbitrayAreaRatio(A1,B1,C1,A2,B2,C2){
   var standardArea = triangleSquare(A1,B1,C1);
   var sampleArea = triangleSquare(A2,B2,C2);

   return Math.round(sampleArea/standardArea*100*100)/100;
}

function calcRatio(){
   //standard value
   var indexA1 = [fi2.B1x.value,fi2.B1y.value]; //Blue
   var indexB1 = [fi2.G1x.value,fi2.G1y.value]; //Green
   var indexC1 = [fi2.R1x.value,fi2.R1y.value]; //Red
   
   //sample
   var indexA2 = [fi2.B2x.value,fi2.B2y.value]; //Blue
   var indexB2 = [fi2.G2x.value,fi2.G2y.value]; //Green
   var indexC2 = [fi2.R2x.value,fi2.R2y.value]; //Red
   
   fi2.areaRatioxy.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
   fi2.coverageRatioxy.value = calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);

   //standard value
   indexA1 = [fi2.B1u.value,fi2.B1v.value]; //Blue
   indexB1 = [fi2.G1u.value,fi2.G1v.value]; //Green
   indexC1 = [fi2.R1u.value,fi2.R1v.value]; //Red

   //sample
   var indexA2 = [fi2.B2u.value,fi2.B2v.value]; //Blue
   var indexB2 = [fi2.G2u.value,fi2.G2v.value]; //Green
   var indexC2 = [fi2.R2u.value,fi2.R2v.value]; //Red

   fi2.areaRatiouv.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
   fi2.coverageRatiouv.value = calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
}

function distance(P1,P2){
   return Math.sqrt((P1[0]-P2[0])**2+(P1[1]-P2[1])**2);
}

function triangleSquare(P1,P2,P3){
   var a = distance(P1,P2);
   var b = distance(P2,P3);
   var c = distance(P3,P1);
   var s = (a+b+c)/2;

   return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}

function xyTOuv_u(C1,C2){
   return Math.round((4*C1)/(-2*C1+12*C2+3)*10**3)/10**3;
}

function xyTOuv_v(C1,C2){
   return Math.round((9*C2)/(-2*C1+12*C2+3)*10**3)/10**3;
}

function uvTOxy_x(C1,C2){
   return Math.round((9*C1)/(6*C1-16*C2+12)*10**3)/10**3;
}

function uvTOxy_y(C1,C2){
   return Math.round((4*C2)/(6*C1-16*C2+12)*10**3)/10**3;
}

function colorKind(obj){
   var idx = obj.selectedIndex;
   var value = obj.options[idx].value;
   fi2.colorF1.value=value;
   fi2.colorF2.value=value;

   if(value=="sRGB"){
      fi2.R1x.value="0.640";
      fi2.R1y.value="0.330";
      fi2.G1x.value="0.300";
      fi2.G1y.value="0.600";
      fi2.B1x.value="0.150";
      fi2.B1y.value="0.060";
   }
   if(value=="DCI-P3"){
      fi2.R1x.value="0.680";
      fi2.R1y.value="0.320";
      fi2.G1x.value="0.265";
      fi2.G1y.value="0.690";
      fi2.B1x.value="0.150";
      fi2.B1y.value="0.060";
   }
   if(value=="NTSC"){
      fi2.R1x.value="0.670";
      fi2.R1y.value="0.330";
      fi2.G1x.value="0.210";
      fi2.G1y.value="0.710";
      fi2.B1x.value="0.140";
      fi2.B1y.value="0.080";
   }
   if(value=="AdobeRGB"){
      fi2.R1x.value="0.640";
      fi2.R1y.value="0.330";
      fi2.G1x.value="0.210";
      fi2.G1y.value="0.710";
      fi2.B1x.value="0.150";
      fi2.B1y.value="0.060";
   }
   // convert xy -> uv
   fi2.R1u.value=xyTOuv_u(fi2.R1x.value, fi2.R1y.value);
   fi2.R1v.value=xyTOuv_v(fi2.R1x.value, fi2.R1y.value);
   fi2.G1u.value=xyTOuv_u(fi2.G1x.value, fi2.G1y.value);
   fi2.G1v.value=xyTOuv_v(fi2.G1x.value, fi2.G1y.value);
   fi2.B1u.value=xyTOuv_u(fi2.B1x.value, fi2.B1y.value);
   fi2.B1v.value=xyTOuv_v(fi2.B1x.value, fi2.B1y.value);

   //NTSCxy
   var indexA1 = [0.140,0.080]; //Blue
   var indexB1 = [0.210,0.710]; //Green
   var indexC1 = [0.670,0.330]; //Red

   var indexA2 = [fi2.B1x.value,fi2.B1y.value]; //Blue
   var indexB2 = [fi2.G1x.value,fi2.G1y.value]; //Green
   var indexC2 = [fi2.R1x.value,fi2.R1y.value]; //Red
   fi2.areaRatioNTSCxy.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);

   //NTSCuv
   indexA1 = [0.152,0.196]; //Blue
   indexB1 = [0.076,0.576]; //Green
   indexC1 = [0.477,0.528]; //Red

   indexA2 = [fi2.B1u.value,fi2.B1v.value]; //Blue
   indexB2 = [fi2.G1u.value,fi2.G1v.value]; //Green
   indexC2 = [fi2.R1u.value,fi2.R1v.value]; //Red

   fi2.areaRatioNTSCuv.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
}

// Ref. This isn't used.
function calcPi(){
   var trials = 10000; // 試行回数
   var t_inner = 0; // 円内の点の数
 
   for(var i = 0; i < trials; i++){
     var x = Math.random(); // 0 ~ 1.0の乱数
     var y = Math.random(); // 0 ~ 1.0の乱数
     var r = Math.sqrt(x * x + y * y);
 
     if(r < 1){
       // 円の内側
       t_inner++;
     }
   }
   // 計算結果
   var result = 4 * t_inner / trials;
   mont.calPi.value = result;
}