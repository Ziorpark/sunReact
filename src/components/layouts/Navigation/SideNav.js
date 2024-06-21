import React, { useState, useEffect } from "react";
import './NavStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

function NavExample() {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(null);

    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };

    useEffect(() => {
        switch (location.pathname) {
            case '/Main':
                setActiveIndex(0);
                break;
            case '/Chip':
                setActiveIndex(1);
                break;
            default:
                setActiveIndex(null);
                break;
        }
    }, [location.pathname]);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={`col-sm-auto sticky-top custom-nav 
                        ${ isHovering ? "grow" : ""}`} 
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>
            <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
                <div style={{marginBottom : 20}}></div>
                <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
                    <li className={`nav-item ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleItemClick(0)}>
                        <a href="/Main" className="nav-link py-4 px-3" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Board">
                            <FontAwesomeIcon icon={faComputer} className={`fs-1 ${activeIndex === 0 ? 'active' : ''}`} />
                        </a>
                    </li>
                    <li className={`nav-item ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(1)}>
                        <a href="/Chip" className="nav-link py-4 px-3" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Chip">
                            <FontAwesomeIcon icon={faMicrochip} className={`fs-1 ${activeIndex === 1 ? 'active' : ''}`} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavExample;