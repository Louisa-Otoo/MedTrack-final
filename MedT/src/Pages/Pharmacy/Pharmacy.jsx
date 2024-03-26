import React, { useEffect } from 'react';
import Pharm from './Pharm';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPharmThunk, fetchPharmThunk } from "../../store/features/Pharmacy/PharmSlice";
import "./Pharm.css";
import toast, {Toaster} from 'react-hot-toast'
import PharmChart from '../../components/Charts/PharmChart';
// import Select from "react-select";
// import makeAnimated from "react-select/animated"

export default function Pharmacy() {
    const [drugName, setDrugName] = useState("");
    const [description, setDescription] = useState("");
    const [unitOfPricing, setPricing] = useState("");
    const [drugCode, setCode] = useState("");
    const [price, setPrice] = useState(0);

    const dispatch = useDispatch();
    const pharmitems = useSelector(state => state.pharmItems);
    // console.log(pharmitems);
    const isLoading = useSelector(state => state.loading);

    const add = (e) => {
        e.preventDefault();

        const pharmItem = {
            drugName,
            description,
            unitOfPricing,
            drugCode,
            price
        }
        console.log(pharmItem);
        dispatch(addPharmThunk(pharmItem));
        toast("Medicine added successfully", {
            position: "top-center",
            style: {
              background: "var(--background-color)",
              color: "var(--button-color-two)"
            },
            duration: 4000,
          });

        setDrugName("");
        setDescription("");
        setPricing("");
        setCode("");
        setPrice(0);
    }

    useEffect(() => {
        dispatch(fetchPharmThunk())
    }, [])


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            add(e);
            console.log('just clicked the enter key')
        }
    }
    
  return (
    <div className="ph">
        <div className='pharmTop'>
            <div className="grup">
                <h3 className="formHeading">Please fill the form to add a new drug</h3>
                <form onSubmit={add} onKeyUp={handleKeyPress} className="form">
                    <Toaster />
                    <div className="formControl">
                        <label htmlFor="drugName">Drug Name</label>
                        <input 
                            autoComplete='false'
                            type="text" placeholder="Type drug name here" id="drugName" name="drugName"
                            value={drugName} onChange={(e) => setDrugName(e.target.value)} 
                        /> <br />
                    </div>
                    <div className="formControl">
                        <label htmlFor="description">Description</label>
                        <input 
                            autoComplete='false'
                            type="text" placeholder="describe drug" id="description" name="description"
                            value={description} onChange={(e) => setDescription(e.target.value)} 
                        /> <br />
                    </div>
                    <div className="formControl">
                        <label htmlFor="pricing">Unit of Pricing</label>
                        <input 
                            autoComplete='false'
                            type="text" placeholder="Tablet" id="pricing" name="pricing"
                            value={unitOfPricing} onChange={(e) => setPricing(e.target.value)}
                        /> <br />
                    </div>
                    <div className="formControl">
                        <label htmlFor="code">Drug Code</label>
                        <input
                            autoComplete='false'
                            type="text" placeholder="Aoc123FH" id="code" name="code"
                            value={drugCode} onChange={(e) => setCode(e.target.value)} 
                        /> <br />
                    </div>
                    <div className="formControl">
                        <label htmlFor="price">Price</label>
                        <input 
                            autoComplete='false'
                            type="number" placeholder="2.02" id="price" name="price" className="priceInput"
                            value={price} onChange={(e) => setPrice(e.target.value)} 
                        /> <br />
                    </div>    
                    <button className='addBtn' disabled={!drugName || !description || !unitOfPricing ||!drugCode || !price}>Add Drug</button>
                </form>
            </div>
            <div className="chart">
                    <PharmChart />
                </div>
        </div>

        {
            isLoading ? (<p>loading...</p>) : (  <Pharm pharmitems={pharmitems} />)
        }

    </div>
  )
}









// import React, { useEffect } from 'react';
// import Pharm from './Pharm';
// import { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { addPharmThunk, fetchPharmThunk } from "../../store/features/Pharmacy/PharmSlice";
// import "./Pharm.css";
// import Select from "react-select";
// import toast, {Toaster} from 'react-hot-toast';
// import PharmChart from '../../components/Charts/PharmChart';

// export default function Pharmacy() {
//     const [drugName, setDrugName] = useState("");
//     const [description, setDescription] = useState("");
//     const [unitOfPricing, setPricing] = useState(null);
//     const [drugCode, setCode] = useState("");
//     const [price, setPrice] = useState(0);
//     const pharmitems = useSelector(state => state.pharmItems);
//     console.log(pharmitems);
// const dispatch = useDispatch();
//     const isLoading = useSelector(state => state.loading);
//     const add = (e) => {
//         e.preventDefault();
//         const pharmItem = {
//             drugName,
//             description,
//             unitOfPricing,
//             drugCode,
//             price
//         }
//         console.log(pharmItem);
//         dispatch(addPharmThunk(pharmItem));
//         toast("Medicine added successfully", {
//             position: "top-center",
//             style: {
//               background: "#BA324F",
//               color: "white"
//             },
//             duration: 4000,
//           });
//         setDrugName("");
//         setDescription("");
//         setPricing(null);
//         setCode("");
//         setPrice(0);
//     }
//     useEffect(() => {
//         dispatch(fetchPharmThunk())
//     }, [])
// return (
//     <div className="mainp">
//         <div className="inph">
//             <div className="ph">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="#550CF2" xmlns="http://www.w3.org/2000/svg">
//                 <g clip-path="url(#clip0_1607_9770)">
//                 <path d="M7.6 2.5V7.5C7.6 7.55523 7.55523 7.6 7.5 7.6H2.5C1.67157 7.6 0.999998 8.27157 1 9.1L1.00001 14.9C1.00001 15.7284 1.67158 16.4 2.50001 16.4H7.50001C7.55524 16.4 7.60001 16.4448 7.60001 16.5L7.6 21.5C7.6 22.3284 8.27157 23 9.1 23H14.9054C15.7338 23 16.4054 22.3284 16.4054 21.5L16.4054 16.4994C16.4054 16.4444 16.4498 16.3997 16.5048 16.3994L21.5092 16.3686C22.334 16.3636 23 15.6935 23 14.8687L23 9.06873C23 8.2367 22.3228 7.56364 21.4908 7.56876L16.506 7.59938C16.4505 7.59972 16.4054 7.55485 16.4054 7.49938V2.5C16.4054 1.67157 15.7338 1 14.9054 1H9.1C8.27157 1 7.6 1.67157 7.6 2.5Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </g>
//                 <defs>
//                 <clipPath id="clip0_1607_9770">
//                 <rect width="24" height="24" fill="white"/>
//                 </clipPath>
//                 </defs>
//                 </svg>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <g clip-path="url(#clip0_1607_9669)">
//                 <path d="M3 6V5.25H2.25V6H3ZM17 6H17.75V5.25H17V6ZM4.75 4C4.75 3.58579 4.41421 3.25 4 3.25C3.58579 3.25 3.25 3.58579 3.25 4L4.75 4ZM3.25 6C3.25 6.41421 3.58579 6.75 4 6.75C4.41421 6.75 4.75 6.41421 4.75 6L3.25 6ZM8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4L8.75 4ZM7.25 6C7.25 6.41421 7.58579 6.75 8 6.75C8.41421 6.75 8.75 6.41421 8.75 6L7.25 6ZM16.75 4C16.75 3.58579 16.4142 3.25 16 3.25C15.5858 3.25 15.25 3.58579 15.25 4L16.75 4ZM15.25 6C15.25 6.41421 15.5858 6.75 16 6.75C16.4142 6.75 16.75 6.41421 16.75 6L15.25 6ZM12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4L12.75 4ZM11.25 6C11.25 6.41421 11.5858 6.75 12 6.75C12.4142 6.75 12.75 6.41421 12.75 6L11.25 6ZM17.7595 22.1009L17.2292 22.6312L17.7595 22.1009ZM22.1009 17.7595L21.5705 18.2898L21.5705 18.2898L22.1009 17.7595ZM17.2405 12.8991L16.7102 13.4295L16.7102 13.4295L17.2405 12.8991ZM12.8991 17.2405L13.4295 16.7102L12.8991 17.2405ZM3 9.25C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75V9.25ZM3 18.25C2.58579 18.25 2.25 18.5858 2.25 19C2.25 19.4142 2.58579 19.75 3 19.75V18.25ZM19.6707 15.3293L20.201 14.799L20.201 14.799L19.6707 15.3293ZM14.799 19.1404C14.5061 19.4333 14.5061 19.9081 14.799 20.201C15.0919 20.4939 15.5667 20.4939 15.8596 20.201L14.799 19.1404ZM16 22.25H4V23.75H16V22.25ZM3.75 22V6H2.25V22H3.75ZM3 6.75H17V5.25H3V6.75ZM16.25 6V12.6824H17.75V6H16.25ZM16.25 21.3414V22H17.75V21.3414H16.25ZM4 22.25C3.86193 22.25 3.75 22.1381 3.75 22H2.25C2.25 22.9665 3.0335 23.75 4 23.75V22.25ZM16 23.75C16.9665 23.75 17.75 22.9665 17.75 22H16.25C16.25 22.1381 16.1381 22.25 16 22.25V23.75ZM2 6.75H18V5.25H2V6.75ZM19.75 5V2H18.25V5H19.75ZM18 0.25H2V1.75H18V0.25ZM0.25 2V5H1.75V2H0.25ZM2 0.25C1.0335 0.25 0.25 1.0335 0.25 2H1.75C1.75 1.86193 1.86193 1.75 2 1.75V0.25ZM19.75 2C19.75 1.0335 18.9665 0.25 18 0.25V1.75C18.1381 1.75 18.25 1.86193 18.25 2H19.75ZM18 6.75C18.9665 6.75 19.75 5.9665 19.75 5H18.25C18.25 5.13807 18.1381 5.25 18 5.25V6.75ZM2 5.25C1.86193 5.25 1.75 5.13807 1.75 5H0.25C0.25 5.9665 1.0335 6.75 2 6.75V5.25ZM3.25 4L3.25 6L4.75 6L4.75 4L3.25 4ZM7.25 4L7.25 6L8.75 6L8.75 4L7.25 4ZM15.25 4L15.25 6L16.75 6L16.75 4L15.25 4ZM11.25 4L11.25 6L12.75 6L12.75 4L11.25 4ZM18.2898 21.5705L13.4295 16.7102L12.3688 17.7708L17.2292 22.6312L18.2898 21.5705ZM21.5705 21.5705C20.6646 22.4765 19.1958 22.4765 18.2898 21.5705L17.2292 22.6312C18.7209 24.1229 21.1395 24.1229 22.6312 22.6312L21.5705 21.5705ZM21.5705 18.2898C22.4765 19.1958 22.4765 20.6646 21.5705 21.5705L22.6312 22.6312C24.1229 21.1395 24.1229 18.7209 22.6312 17.2292L21.5705 18.2898ZM13.4295 13.4295C14.3354 12.5235 15.8042 12.5235 16.7102 13.4295L17.7708 12.3688C16.2791 10.8771 13.8605 10.8771 12.3688 12.3688L13.4295 13.4295ZM12.3688 12.3688C10.8771 13.8605 10.8771 16.2791 12.3688 17.7708L13.4295 16.7102C12.5235 15.8042 12.5235 14.3354 13.4295 13.4295L12.3688 12.3688ZM3 10.75H7V9.25H3V10.75ZM7.25 11V18H8.75V11H7.25ZM7 18.25H3V19.75H7V18.25ZM7.25 18C7.25 18.1381 7.13807 18.25 7 18.25V19.75C7.9665 19.75 8.75 18.9665 8.75 18H7.25ZM7 10.75C7.13807 10.75 7.25 10.8619 7.25 11H8.75C8.75 10.0335 7.9665 9.25 7 9.25V10.75ZM16.7102 13.4295L19.1404 15.8596L20.201 14.799L17.7708 12.3688L16.7102 13.4295ZM19.1404 15.8596L21.5705 18.2898L22.6312 17.2292L20.201 14.799L19.1404 15.8596ZM15.8596 20.201L20.201 15.8596L19.1404 14.799L14.799 19.1404L15.8596 20.201Z" fill="black"/>
//                 </g>
//                 <defs>
//                 <clipPath id="clip0_1607_9669">
//                 <rect width="24" height="24" fill="white"/>
//                 </clipPath>
//                 </defs>
//                 </svg>
//                 <div className="grup">
//                     <form onSubmit={add}>
//                         <Toaster />
//                         <table>
//                             <tbody>
//                                 <tr>
//                                     <td>
//                                         <label htmlFor="drugName">Drug Name</label>
//                                     </td>
//                                     <td>
//                                         <input
//                                         type="text" placeholder="Type drug name here" id="drugName" name="drugName"
//                                         value={drugName} onChange={(e) => setDrugName(e.target.value)}
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>
//                                         <label htmlFor="description">Description</label>
//                                     </td>
//                                     <td>
//                                         <textarea placeholder="Describe drug here" id="description" name="description"
//                                         value={description} onChange={(e) => setDescription(e.target.value)}
//                                         >e</textarea>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>
//                                         <label htmlFor="pricing">Unit of Pricing</label>
//                                     </td>
//                                     <td>
//                                         <input
//                                         type="text" placeholder="Tablet" id="pricing" name="pricing"
//                                         value={unitOfPricing} onChange={(e) => setPricing(e.target.value)}
//                                         />
//                                          {/* <Select
//                                         name="pricing"
//                                         id="pricing"
//                                         options={options}
//                                         placeholder="Choose lab type below"
//                                         defaultValue={unitOfPricing}
//                                         onChange={setPricing}
//                                         isSearchable
//                                         noOptionsMessage={() => "Unit of pricing not available"}
//                                         styles={{
//                                             placeholder: (baseStyles, state) => ({
//                                                 ...baseStyles,
//                                                 color: "#183446"
//                                             }),
//                                             control: (baseStyles) => ({
//                                                 ...baseStyles,
//                                                 border: "none",
//                                                 borderBottom: "1px solid #05668D",
//                                                 backgroundColor: "white",
//                                                 width: "9rem",
//                                                 fontSize: "13px"
//                                             }),
//                                             clearIndicator: () => ({
//                                                 color: "blue"
//                                             }),
//                                             dropdownIndicator: () => ({
//                                                 color: "black"
//                                             })
//                                         }}
//                                         /> */}
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>
//                                         <label htmlFor="code">Drug Code</label>
//                                     </td>
//                                     <td>
//                                         <input
//                                         type="text" placeholder="Aoc123FH" id="code" name="code"
//                                         value={drugCode} onChange={(e) => setCode(e.target.value)}
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>
//                                         <label htmlFor="price">Price</label>
//                                     </td>
//                                     <td>
//                                         <input
//                                         type="number" placeholder="2.02" id="price" name="price"
//                                         value={price} onChange={(e) => setPrice(e.target.value)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <button>ADD</button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </form>
//                     <div className="chart" style={{width: "5vw", height:"60vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
//                         <PharmChart />
//                     </div>
//                 </div>
//                 {
//                     isLoading ? (<p>loading...</p>) : (  <Pharm pharmitems={pharmitems} />)
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }