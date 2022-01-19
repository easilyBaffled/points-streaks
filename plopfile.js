import { featureConfig } from "./plopGenerators/feature/index.js";

export default function( plop ) {
    // create your generators here
    plop.setGenerator( "feature", featureConfig );
}
