export const ArrowHeadBottom: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.31189 1.10291L7.18524 7.81531L13.0586 1.10291"
      stroke={fg}
      strokeWidth="1.6781"
      strokeLinecap="round"
    />
  </svg>
);

export const Pencil: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    color={fg}
    className={className}
  >
    <path
      fill={fg}
      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    />
  </svg>
);

export const Eye: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    color={fg}
    className={className}
    viewBox="0 0 576 512"
  >
    <path
      fill={fg}
      d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
    />
  </svg>
);

export const Trash: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    color={fg}
    className={className}
    viewBox="0 0 448 512"
  >
    <path
      fill={fg}
      d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
    />
  </svg>
);

export const ArrowRight: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 448 512"
    color={fg}
    className={className}
  >
    <path
      fill={fg}
      d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
    />
  </svg>
);

export const Cart: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    color={fg}
    className={className}
    height="1em"
    viewBox="0 0 576 512"
  >
    <path
      fill={fg}
      d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
    />
  </svg>
);

export const SearchButton: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    color={fg}
    className={className}
    viewBox="0 0 512 512"
  >
    <path
      fill={fg}
      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
    />
  </svg>
);

export const StartRating: React.FC<{}> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 576 512"
    fill="yellow"
    className="w-6 h-6   mr-1"
  >
    <path
      fill="yellow"
      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
    />
  </svg>
);

export const FacebookSvg: React.FC<{}> = () => (
  <svg
    fill="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path
      fill="#3b82f6"
      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
    ></path>
  </svg>
);

export const TwitterSvg: React.FC<{}> = () => (
  <svg
    fill="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path
      fill="#3b82f6"
      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
    ></path>
  </svg>
);

export const MessengerSvg: React.FC<{}> = () => (
  <svg
    fill="#3b82f6"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
  </svg>
);
export const UserSvg: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    color={fg}
    className={className}
    height="1em"
    viewBox="0 0 448 512"
  >
    <path
      fill={fg}
      d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
    />
  </svg>
);

export const CardSvg: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    className={className}
    color={fg}
    viewBox="0 0 576 512"
  >
    <path
      fill={fg}
      d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
    />
  </svg>
);

export const ShippingSvg: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    color={fg}
    height="1em"
    viewBox="0 0 640 512"
  >
    <path
      fill={fg}
      d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"
    />
  </svg>
);

export const MinusSvg: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    className="fill-current text-gray-600 w-3"
    color={fg}
    viewBox="0 0 448 512"
  >
    <path
      fill={fg}
      d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    />
  </svg>
);

export const PlusSvg: React.FC<{
  fg: string;
  className?: string;
}> = ({ fg, className }) => (
  <svg
    className="fill-current text-gray-600 w-3"
    color={fg}
    viewBox="0 0 448 512"
  >
    <path
      fill={fg}
      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    />
  </svg>
);
