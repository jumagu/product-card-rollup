declare module "*.css" {
  const content: { readonly [className: string]: string };
  export default content;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}
