import {
  FaAngleDown,
  FaArrowDown,
  FaBarsProgress,
  FaCalendar,
} from "react-icons/fa6";
import pic from "../../assets/pix.jpg";
import { useDispatch, useSelector } from "react-redux";

import SmallPiece from "./SmallPiece";
import {
  MdAccountCircle,
  MdClose,
  MdMenu,
  MdPeople,
  MdQueryStats,
  MdReport,
} from "react-icons/md";
import {
  changeMenuState,
  changeToggleMenuState,
  displaySessioned,
} from "../../global/reduxState";
import { useEffect, useState } from "react";
import Session from "./Session";
import {
  useSchoolCookie,
  useSchoolSessionData,
} from "../../pages/hook/useSchoolAuth";
import AddSession from "./AddSession";

const Header = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: any) => state.toggle);
  const toggleMenu = useSelector((state: any) => state.toggleMenu);
  const session = useSelector((state: any) => state?.sessionToggle);
  const toggleSession = useSelector((state: any) => state.sessionToggled);

  const [sess, setSess] = useState<boolean>(false);

  const handleMenu = () => {
    if (!document.startViewTransition) {
      dispatch(changeToggleMenuState(!toggleMenu));
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeToggleMenuState(!toggleMenu));
        dispatch(changeMenuState(false));
      });
    }
  };

  const { dataID } = useSchoolCookie();

  const { schoolInfo, loading } = useSchoolSessionData(dataID);

  const [sessionStore, setSessionStore] = useState("");

  useEffect(() => {
    console.log(schoolInfo);

    setSessionStore(
      loading
        ? ""
        : schoolInfo[(schoolInfo!.length ? schoolInfo!.length : 1) - 1]?.year
    );
  }, [loading]);

  return (
    <div
      className="h-[50px] bg-blue-50 border-b w-full flex justify-center items-center  z-10 fixed top-0 left-0 text-blue-950"
      onClick={() => {}}
    >
      {/* <div>  */}
      <div className="flex items-center  justify-end w-[90%]">
        <div
          className="mr-5 font-medium cursor-pointer flex items-center bg-slate-200 px-4 py-2 rounded-sm z-30"
          onClick={() => {
            setSess(!sess);
            dispatch(displaySessioned(!toggleSession));
          }}
        >
          {" "}
          <FaCalendar />
          <span className="text-[12px] mx-1">
            Session:{" "}
            <span>
              {" "}
              {loading
                ? sessionStore
                : schoolInfo[(schoolInfo!.length ? schoolInfo!.length : 1) - 1]
                    ?.year}
            </span>
          </span>
          <div className="transition-all duration-300 ">
            {toggleSession ? (
              <FaAngleDown className="-rotate-180 duration-300 transition-all" />
            ) : (
              <FaAngleDown className="-rotate-0 duration-300 transition-all" />
            )}
          </div>
        </div>

        <div
          className="flex items-center px-2 py-1 border rounded-full gap-3 duration-300 transition-all cursor-pointer z-10 bg-white shadow-sm"
          onClick={() => {
            setSess(false);

            dispatch(changeMenuState(!toggle));
            dispatch(changeToggleMenuState(false));
          }}
        >
          <img className="w-8 h-8 rounded-full border object-cover" src={pic} />

          {toggle ? (
            <FaArrowDown className="rotate-180 duration-300 transition-all" />
          ) : (
            <FaArrowDown className="rotate-0 duration-300 transition-all" />
          )}
        </div>

        <div className=" md:hidden text-[30px] cursor-pointer ml-3  duration-300 transition-all">
          {toggleMenu ? (
            <MdClose
              className="duration-500 transition-all"
              onClick={handleMenu}
            />
          ) : (
            <MdMenu
              className="duration-500 transition-all"
              onClick={handleMenu}
            />
          )}
        </div>
      </div>

      {/* </div> */}

      <div
        className={`absolute duration-300 transition-all ${
          toggle ? "right-6 top-14  " : "right-6 -top-56  "
        }`}
      >
        <SmallPiece
          name={[
            { title: "Account", icon: <MdAccountCircle />, to: "settings" },
          ]}
          log
        />
      </div>

      <div
        className={`absolute duration-300 transition-all ${
          toggleSession ? "right-24 top-14  " : "right-24 -top-56  "
        }`}
      >
        <Session />
      </div>

      {session && (
        <div className=" absolute top-0 right-0 w-full md:w-[calc(100%-250px)] bg-[#daebffad] backdrop-blur-sm flex items-center justify-center h-screen">
          <AddSession />
        </div>
      )}

      {toggleMenu && (
        <div
          className={`absolute md:hidden duration-300 transition-all ${
            toggleMenu ? "right-6 top-14  " : "right-6 -top-24  "
          }`}
        >
          <SmallPiece
            name={[
              {
                title: "Dashboard",
                icon: <MdQueryStats />,
                to: "/",
              },
              {
                title: "View Staffs",
                icon: <MdPeople />,
                to: "view-staff",
              },
              {
                title: "View Students",
                icon: <FaBarsProgress />,
                to: "view-students",
              },
              {
                title: "Reports",
                icon: <MdReport />,
                to: "report",
              },
            ]}
            but
          />
        </div>
      )}
    </div>
  );
};

export default Header;
