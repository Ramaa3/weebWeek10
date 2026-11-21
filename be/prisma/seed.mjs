import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const data = {
 facilities:[
  {id:'SEN-001',name:'Fasilitas PLTN A',location:'Lokasi A',capacity:'850 MW',status:'Beroperasi'},
  {id:'SEN-002',name:'Fasilitas PLTN B',location:'Lokasi B',capacity:'1.000 MW',status:'Pemeliharaan'},
  {id:'SEN-003',name:'Fasilitas PLTN C',location:'Lokasi C',capacity:'750 MW',status:'Tidak Aktif'}],
 monitoring:[
  {id:'ENV-001',type:'Udara',parameter:'PM2.5',value:'12 µg/m³',activity:'Pemantauan partikulat udara'},
  {id:'ENV-002',type:'Air',parameter:'pH air',value:'7,2',activity:'Pemantauan kualitas air'},
  {id:'ENV-003',type:'Tanah',parameter:'pH tanah',value:'6,5',activity:'Pemantauan kondisi tanah'}],
 reports:[
  {id:'LAP-001',category:'Kualitas Udara',date:'2026-09-27',status:'Ditinjau',description:'Laporan simulasi kualitas udara.'},
  {id:'LAP-002',category:'Kualitas Air',date:'2026-09-28',status:'Ditinjau',description:'Laporan simulasi kualitas air.'},
  {id:'LAP-003',category:'Kualitas Tanah',date:'2026-09-29',status:'Menunggu Tinjauan',description:'Laporan simulasi kondisi tanah.'},
  {id:'tesss',category:'Kualitas Udara',date:'2026-11-15',status:'Menunggu Tinjauan',description:'teesss'},
  {id:'ini week 9',category:'Kualitas Tanah',date:'2026-11-15',status:'Ditinjau',description:'week 9 ya pa'}],
 communityNotes:[
  {id:1,userId:1,title:'Pemantauan kualitas udara',body:'Data simulasi menunjukkan kualitas udara berada dalam rentang normal.'},
  {id:2,userId:2,title:'Pemeriksaan kualitas air',body:'Pengukuran pH air simulasi tercatat stabil pada pemeriksaan rutin.'},
  {id:3,userId:3,title:'Kondisi lingkungan fasilitas',body:'Catatan simulasi: tidak ditemukan perubahan signifikan di sekitar fasilitas.'}]
};
async function seed(){
 for(const item of data.facilities) await prisma.facility.upsert({where:{id:item.id},create:item,update:item});
 for(const item of data.monitoring) await prisma.monitoring.upsert({where:{id:item.id},create:item,update:item});
 for(const item of data.reports){const value={...item,date:new Date(item.date+'T00:00:00Z')};await prisma.report.upsert({where:{id:item.id},create:value,update:value});}
 for(const item of data.communityNotes) await prisma.communityNote.upsert({where:{id:item.id},create:item,update:item});
}
seed().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>prisma.$disconnect());

