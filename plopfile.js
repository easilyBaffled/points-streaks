import { featureConfig } from "./plopGenerators/feature/index.js";
import { sliceConfig } from "./plopGenerators/slice/index.js";

export default function( plop ) {
    // create your generators here
    plop.setGenerator( "feature", featureConfig );
    plop.setGenerator( "slice", sliceConfig );
}
