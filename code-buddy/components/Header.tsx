"use client";

import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";

const homeOptions = [
  {
    name: "About",
    description: "Find out about the project",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
  {
    name: "Credits",
    description: "Find out about the project's authors",
    href: "#",
    icon: UserGroupIcon,
  },
  {
    name: "Sign up",
    description: "Sign up to receive updates on the project",
    href: "#",
    icon: EnvelopeIcon,
  },
];


const generateOptions = [
  {
    name: "Generate for iOS",
    description: "Use CodeBuddy to generate code of iOS application",
    href: "#",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Playground",
    description: "Start with no setup needed",
    href: "/playground",
    icon: CodeBracketIcon,
  },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
      setIsLoggedIn( window.localStorage.getItem("token") != null)
  });

  return (
    <header className="bg-[#2c3150]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5 p-1.5 pr-32">
          <div className="flex lg:flex-1">
            <span className="sr-only">CodeBuddy</span>
            <img
              className="h-10 w-auto"
              src="https://drive.google.com/thumbnail?id=1Jt9SI6lHy64vvK14OGJgYt78pg6uaRF_&sz=w1000"
              alt=""
            />
          </div>
        </Link>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Home
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-white"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen
               max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="p-4">
                  {homeOptions.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6
                        hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                        <item.icon
                          className="h-6 w-6 text-[#499F68] group-hover:text-green-600"
                          aria-hidden="true"
                        ></item.icon>
                      </div>

                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-[#346F4A]"
                        >
                          {item.name}
                          <span className="absolute inset-0"></span>
                        </a>
                        <p className="mt-1 text-[#346F4A]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 pl-16 text-white">
              Generate
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-white"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen
               max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="p-4">
                  {generateOptions.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 
                        hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                        <item.icon
                          className="h-6 w-6 text-[#499F68] group-hover:text-green-600"
                          aria-hidden="true"
                        ></item.icon>
                      </div>

                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-[#346F4A]"
                        >
                          {item.name}
                          <span className="absolute inset-0"></span>
                        </a>
                        <p className="mt-1 text-[#346F4A]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold leading-6 text-white">
            Log in
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10"></div>
        <Dialog.Panel
          className="
        fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#2c3150] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <a href="" className="-m-1.5 p-1.5">
              <span className="sr-only">CodeBuddy</span>
              <img
                className="h-8 w-auto"
                src="https://drive.google.com/thumbnail?id=1Jt9SI6lHy64vvK14OGJgYt78pg6uaRF_"
                alt=""
              ></img>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true"></XMarkIcon>
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className="flex w-full items-center justify-between rounded-lg py-2 
                    pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-green-800"
                      >
                        Home
                        <ChevronDownIcon
                          className={cn(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        ></ChevronDownIcon>
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {...homeOptions.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 
                        text-white hover:bg-blue-800"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className="flex w-full items-center justify-between rounded-lg py-2 
                    pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-green-800"
                      >
                        Generate
                        <ChevronDownIcon
                          className={cn(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        ></ChevronDownIcon>
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {...generateOptions.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 
                        text-white hover:bg-blue-800"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="py-6">
                <a
                  href=""
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-green-800"
                >
                  {isLoggedIn ? 'Logout' : "Log in"}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
