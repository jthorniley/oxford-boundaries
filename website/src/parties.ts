export type Party = "LAB" | "GRN" | "CON" | "LD" | "IND" | "TUSC";

export const DEFAULT_COLOR: string = "#aaaaaa";

export function getPartyColor(party: Party): string {
    if (party === "LAB") {
      return "#f71111";
    } else if (party === "GRN") {
      return "#14e805";
    } else if (party === "CON") {
      return "#168bb3";
    } else if (party === "LD") {
      return "#f79d16";
    } else if (party === "TUSC") {
      return "#423311";
    } else if (party === "IND") {
      return "#555555";
    } else if (party === "IOA") {
      return "#552195";
    }
    // unknown
    return DEFAULT_COLOR;
}
export type CandidateEntry = {
    lastName: string
    names: string
    description: string
    party: Party
    votes: number
    elected: boolean

}
