/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from 'react';
import './style.css';

function Tables() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [totalMeasurementSum, setTotalMeasurementSum] = useState(0);
  const [selectedBoqId, setSelectedBoqId] = useState('');
  const [selectedProductDescription, setSelectedProductDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/boq/getall')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Error fetching table data:', error));
  }, []);

  useEffect(() => {
    let filteredData = data;
    if (selectedBoqId) {
      filteredData = data.filter(item => item.boqId === parseInt(selectedBoqId));
    }
    if (selectedProductDescription) {
      filteredData = filteredData.filter(item => item.productDescription === selectedProductDescription);
    }
  
    setFilteredData(filteredData);
  
    const totalAmountSum = filteredData.reduce((total, item) => total + item.totalAmount, 0);
    setTotalAmountSum(totalAmountSum);
  
    const totalMeasurementSum = filteredData.reduce((total, item) => total + item.totalMeasurement, 0);
    setTotalMeasurementSum(totalMeasurementSum);
  }, [data, selectedBoqId, selectedProductDescription]);
  

  const handleBoqIdChange = (event) => {
    setSelectedBoqId(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setSelectedProductDescription(event.target.value);
  };

  const boqIds = Array.from(new Set(data.map(item => item.boqId)));
  const productDescriptions = Array.from(new Set(data.map(item => item.productDescription)));

  return (
    <div className="table-container2">
      <h1>Table Data</h1>
      <div className="dropdown">
        <select value={selectedBoqId} onChange={handleBoqIdChange}>
          <option value="">All BoqIds</option>
          {boqIds.map(boqId => (
            <option key={boqId} value={boqId}>{boqId}</option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <select value={selectedProductDescription} onChange={handleProductDescriptionChange}>
          <option value="">All Product Descriptions</option>
          {productDescriptions.map(description => (
            <option key={description} value={description}>{description}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Boq Id</th>
            <th>Item Description</th>
            <th>Product Description</th>
            <th>Length</th>
            <th>Height</th>
            <th>Width</th>
            <th>Total Measurement</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.boqId}</td>
              <td>{item.itemDescription}</td>
              <td>{item.productDescription}</td>
              <td>{item.length}</td>
              <td>{item.height}</td>
              <td>{item.width}</td>
              <td>{item.totalMeasurement}</td>
              <td>{item.unit}</td>
              <td>{item.rate}</td>
              <td>{item.totalAmount}</td>
            </tr>
          ))}
          <tr className="table-summary">
            <td colSpan="7" className="summary-label">Total:</td>
            <td>{totalMeasurementSum}</td>
            <td colSpan="2" className="summary-label">Total:</td>
            <td>{totalAmountSum}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tables;


// const Tables = () => {
//   return (
//     <>
//       <Header />
//       {/* Page content */}
//       <Container className="mt--7" fluid>
//         {/* Table */}
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <h3 className="mb-0">Card tables</h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Project</th>
//                     <th scope="col">Budget</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Users</th>
//                     <th scope="col">Completion</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/bootstrap.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Argon Design System
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$2,500 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-warning" />
//                         pending
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip742438047"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip742438047"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip941738690"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip941738690"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip804044742"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip804044742"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip996637554"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip996637554"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">60%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="60"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/angular.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Angular Now UI Kit PRO
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$1,800 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-success" />
//                         completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip746418347"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip746418347"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip102182364"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip102182364"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip406489510"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip406489510"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip476840018"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip476840018"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">100%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="100"
//                             barClassName="bg-success"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/sketch.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">Black Dashboard</span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$3,150 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-danger" />
//                         delayed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip753056318"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip753056318"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip441753266"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip441753266"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip188462246"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip188462246"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip621168444"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip621168444"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">72%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="72"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/react.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             React Material Dashboard
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$4,400 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-info" />
//                         on schedule
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip875258217"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip875258217"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip834416663"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip834416663"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip372449339"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip372449339"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip108714769"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip108714769"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">90%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="90"
//                             barClassName="bg-info"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/vue.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Vue Paper UI Kit PRO
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$2,200 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-success" />
//                         completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip664029969"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip664029969"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip806693074"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip806693074"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip844096937"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip844096937"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip757459971"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip757459971"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">100%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="100"
//                             barClassName="bg-success"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//               <CardFooter className="py-4">
//                 <nav aria-label="...">
//                   <Pagination
//                     className="pagination justify-content-end mb-0"
//                     listClassName="justify-content-end mb-0"
//                   >
//                     <PaginationItem className="disabled">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                         tabIndex="-1"
//                       >
//                         <i className="fas fa-angle-left" />
//                         <span className="sr-only">Previous</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem className="active">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         1
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         2 <span className="sr-only">(current)</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         3
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="fas fa-angle-right" />
//                         <span className="sr-only">Next</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                   </Pagination>
//                 </nav>
//               </CardFooter>
//             </Card>
//           </div>
//         </Row>
//         {/* Dark table */}
//         <Row className="mt-5">
//           <div className="col">
//             <Card className="bg-default shadow">
//               <CardHeader className="bg-transparent border-0">
//                 <h3 className="text-white mb-0">Card tables</h3>
//               </CardHeader>
//               <Table
//                 className="align-items-center table-dark table-flush"
//                 responsive
//               >
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">Project</th>
//                     <th scope="col">Budget</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Users</th>
//                     <th scope="col">Completion</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/bootstrap.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Argon Design System
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$2,500 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-warning" />
//                         pending
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip731399078"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip731399078"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip491083084"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip491083084"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip528540780"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip528540780"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip237898869"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip237898869"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">60%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="60"
//                             barClassName="bg-warning"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/angular.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Angular Now UI Kit PRO
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$1,800 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-success" />
//                         completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip188614932"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip188614932"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip66535734"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip delay={0} target="tooltip66535734">
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip427561578"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip427561578"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip904098289"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip904098289"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">100%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="100"
//                             barClassName="bg-success"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/sketch.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">Black Dashboard</span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$3,150 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-danger" />
//                         delayed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip707904950"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip707904950"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip353988222"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip353988222"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip467171202"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip467171202"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip362118155"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip362118155"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">72%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="72"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/react.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             React Material Dashboard
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$4,400 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-info" />
//                         on schedule
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip226319315"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip226319315"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip711961370"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip711961370"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip216246707"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip216246707"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip638048561"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip638048561"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">90%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="90"
//                             barClassName="bg-info"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/vue.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Vue Paper UI Kit PRO
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$2,200 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-success" />
//                         completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip781594051"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip781594051"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip840372212"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip840372212"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip497647175"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip497647175"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip951447946"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip951447946"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">100%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="100"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Tables;
