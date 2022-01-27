export const ratings = {
    category: [ "misc", "wrk", "home" ],
    deadline: [ "none", "decay", "soon", "before-thurs" ],
    need:     [ "unexpected", "expected" ],
    value:    [ "entertain", "could", "should", "yes" ]
};
const categoryRatings = [ "misc", "wrk", "home" ];
const need = [ "unexpected", "expected" ];
const value = [ "entertain", "could", "should", "yes" ];
const deadline = [ "none", "decay", "soon", "before-thurs" ];

export const rateTask = ( task ) => {
    const [ category, need, deadline ] = task.replaceAll( "#", "" ).split( " " );
    const taskRating =
        ratings.category.indexOf( category ) +
        ratings[ category === "misc" ? "value" : "need" ].indexOf( need ) +
        ratings.deadline.indexOf( deadline );
    return taskRating;
};
