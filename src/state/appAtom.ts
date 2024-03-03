import { atom } from "jotai";
import { DataPoint } from "../data/types";
import small from '../data/small.json';

const s = small.map(({ value, date }) => ({ value, date: new Date(date) }));

export type View = {
    name: string;
    visible: boolean;
    data: DataPoint[]
}

const VIEWS: View[] = [
    {
        name: "Line",
        visible: true,
        data: s
    },
    {
        name: "Sparkline",
        visible: false,
        data: []
    },
    {
        name: "Power",
        visible: false,
        data: []
    },
    {
        name: "Hash",
        visible: false,
        data: []
    }
]

const viewsAtom = atom(VIEWS);

const chartAtom = atom<View[], string[], void>(get => get(viewsAtom).filter(v => v.visible),
    (get, set, names) => {
        const views = get(viewsAtom);

        const v = views.map(v => {

            return {
                ...v,
                ...{
                    visible: names.includes(v.name)
                }
            }
        })

        return set(viewsAtom, v)

    })

export {
    viewsAtom,
    chartAtom
}