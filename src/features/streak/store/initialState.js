import { listToEntity } from "@/utils";
import { createTask } from "@/features/streak";

export const initialState = listToEntity(
    [
        "email",
        "meditate",
        "teeth",
        "clean 5%",
        "quirk",
        "walk",
        "dev tea",
        "luminosity",
        "๐๐ (20)",
        "read(20)",
        "track ๐ฅช",
        "track ๐ฅค",
        "fiber ๐งป",
        "#points",
        "reduce lists 5%"
    ].map( ( s ) => createTask( s, { id: s.replace( / /g, "-" ) }) )
);
