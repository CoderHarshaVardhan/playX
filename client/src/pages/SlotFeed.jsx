// import { useEffect, useState } from "react";
// import { getSlots, joinSlot } from "../services/api";
// import SlotCard from "../components/SlotCard";

// export default function SlotFeed() {
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         let lat = 17.3850, lng = 78.4867;
//         if (navigator.geolocation) {
//           await new Promise((resolve) =>
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 lat = pos.coords.latitude;
//                 lng = pos.coords.longitude;
//                 resolve();
//               },
//               () => resolve()
//             )
//           );
//         }

//         const res = await getSlots({ lat, lng, radiusKm: 10 });
//         setSlots(res.data.slots);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSlots();
//   }, []);

//   const handleJoin = async (id) => {
//     try {
//       await joinSlot(id);
//       alert("Joined successfully!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to join");
//     }
//   };

//   if (loading)
//     return <div className="text-center text-gray-500 mt-10">Loading slots...</div>;

//   if (!slots.length)
//     return <div className="text-center text-gray-500 mt-10">No matches nearby</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-4 space-y-4">
//       {slots.map((slot) => (
//         <SlotCard key={slot._id} slot={slot} onJoin={handleJoin} />
//       ))}
//     </div>
//   );
// }
