"use client";
import PublicIpLookup from "./PublicIpLookup";
export default function InteractiveIpFinder(props:{placeholder?:string;buttonLabel?:string;defaultTitle?:string;highlightMode?:"location"|"detection"|"general"}) {
 return <PublicIpLookup placeholder={props.placeholder} buttonLabel={props.buttonLabel} title={props.defaultTitle}/>;
}
