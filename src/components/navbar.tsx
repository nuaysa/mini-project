
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";
import LoginButton from "./button";
import Link from "next/link";
  
  export function Compnavbar() {
    return (
      <Navbar fluid rounded>
        <NavbarBrand href="/">
          <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="ATE|All Tickets and Events" />
          <span className="self-center whitespace-nowrap text-xl font-semibold">ATE</span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <LoginButton/>
            </DropdownHeader>
            <DropdownItem><Link href="/Login/users">Login</Link></DropdownItem>
            <DropdownItem><Link href="/Register/users">Register</Link></DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="/" active>
            Home
          </NavbarLink>
          {/* <NavbarLink href="/">Home</NavbarLink> */}
          <NavbarLink href="/list">Lists</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    );
  }
  