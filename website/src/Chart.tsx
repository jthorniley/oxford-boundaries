import React from "react";
import { CandidateEntry, getPartyColor } from "./parties";

type ChartProps = {
    candidates: CandidateEntry[]
    title: string
}

export function Chart(props: ChartProps) {
    const sortedCandidates = [...props.candidates];

    sortedCandidates.sort((a, b) => Math.sign(b.votes - a.votes))

    let totalVotes = 0;
    for (const candidate of sortedCandidates) {
        totalVotes += candidate.votes;
    }

    const bars: React.ReactElement[] = []
    let i = 0;
    for (const candidate of sortedCandidates) {
        const pct = Math.round((candidate.votes / totalVotes) * 100)
        i = i + 1;
        bars.push(
            <React.Fragment key={i}>
                <div style={{ width: `${pct*3}px`, backgroundColor: getPartyColor(candidate.party) }}>
                    {(pct > 5) && <span style={{color: "white", paddingLeft: "2px"}}>{pct}</span>}
                </div>
            </React.Fragment>
        )
    }


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div>{props.title}</div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "30px",
                    width: "300px"
                }}>
                    {bars}
                </div>
            </div>
        </>
    )
}