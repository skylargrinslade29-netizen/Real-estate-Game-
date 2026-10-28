/* Real Estate Empire: illustrative photo galleries for fictional properties */
(function(){
"use strict";
const exterior=[
"photo-1600596542815-ffad4c1539a9","photo-1600585154340-be6161a56a0c",
"photo-1600566753086-00f18fb6b3ea","photo-1600047509807-ba8f99d2cdde",
"photo-1600607687920-4e2a09cf159d","photo-1600573472592-401b489a3cdc",
"photo-1600566753190-17f0baa2a6c3","photo-1600573472591-ee6b68d14c68"];
const interiors=["photo-1600607687939-ce8a6c25118c","photo-1600566752355-35792bedcfea","photo-1600607687644-c7171b42498f","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d"];
const photo=id=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=1100&q=78";
const styles=document.createElement("style");
styles.textContent=`
.re-photo{position:relative;overflow:hidden;border-radius:13px;background:#c8dbe5;margin:0 0 12px;cursor:pointer;border:0;display:block;width:100%;padding:0;text-align:left}
.re-photo img{width:100%;height:195px;object-fit:cover;display:block}
.re-photo-tag{position:absolute;bottom:10px;left:10px;background:#102836df;color:white;border-radius:25px;padding:7px 11px;font-size:12px;font-weight:700}
.re-gallery-backdrop{position:fixed;inset:0;background:#06101df2;z-index:200;display:flex;align-items:center;justify-content:center;padding:14px}
.re-gallery{max-width:800px;width:100%;background:#172638;color:white;border-radius:20px;padding:12px;box-shadow:0 15px 60px #0009}
.re-gallery img{width:100%;height:min(58vh,510px);object-fit:contain;background:#091421;border-radius:12px}
.re-gallery-bar{display:flex;justify-content:space-between;gap:10px;align-items:center;margin:8px 0}
.re-gallery-bar button{background:#dff7ff;color:#143b4c}
.re-gallery-caption{font-size:12px;color:#becbd8;margin:9px 4px}
@media(max-width:700px){.re-photo img{height:210px}.re-gallery img{height:52vh}}
`;
document.head.appendChild(styles);
const galleries=new Map();
window.rePropertyPhoto=function(kind,id){
const key=kind+":"+id,seed=Math.abs(Number(id)||0);
const gallery=kind==="house"?[exterior[seed%exterior.length],interiors[seed%interiors.length],interiors[(seed+2)%interiors.length]]:kind==="land"?[exterior[(seed+5)%exterior.length]]:[exterior[(seed+3)%exterior.length],interiors[(seed+1)%interiors.length]];
galleries.set(key,gallery);
return '<button type="button" class="re-photo" data-photo="'+key+'" aria-label="View illustrative property photos"><img loading="lazy" src="'+photo(gallery[0])+'" alt="Illustrative '+kind+' property photograph"><span class="re-photo-tag">📷 View '+gallery.length+' illustrative photo'+(gallery.length===1?'':'s')+'</span></button>';
};
let active=null,slide=0,overlay=null;
function show(){if(!overlay||!active)return;const items=galleries.get(active)||[];const img=overlay.querySelector("img");img.src=photo(items[slide]);img.alt="Illustrative property photo "+(slide+1);overlay.querySelector(".re-count").textContent=(slide+1)+" / "+items.length;overlay.querySelector(".re-prev").disabled=items.length<2;overlay.querySelector(".re-next").disabled=items.length<2;}
function close(){overlay?.remove();overlay=null;active=null;}
document.addEventListener("click",e=>{
const trigger=e.target.closest("[data-photo]");
if(trigger){e.preventDefault();active=trigger.dataset.photo;slide=0;overlay=document.createElement("div");overlay.className="re-gallery-backdrop";overlay.innerHTML='<div class="re-gallery" role="dialog" aria-modal="true" aria-label="Property photo gallery"><div class="re-gallery-bar"><b>🏡 Property Photos</b><button type="button" class="re-close">✕ Close</button></div><img alt="Property image"><div class="re-gallery-bar"><button type="button" class="re-prev">← Previous</button><span class="re-count"></span><button type="button" class="re-next">Next →</button></div><p class="re-gallery-caption">Illustrative photos only. Fictional game properties; images do not represent an actual listed address or condition.</p></div>';document.body.appendChild(overlay);show();return;}
if(!overlay)return;
if(e.target===overlay||e.target.closest(".re-close"))close();
else if(e.target.closest(".re-prev")){slide=(slide-1+(galleries.get(active)?.length||1))%(galleries.get(active)?.length||1);show();}
else if(e.target.closest(".re-next")){slide=(slide+1)%(galleries.get(active)?.length||1);show();}
});
document.addEventListener("keydown",e=>{if(!overlay)return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")overlay.querySelector(".re-prev").click();if(e.key==="ArrowRight")overlay.querySelector(".re-next").click();});
})();
