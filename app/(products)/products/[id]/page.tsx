import React from 'react';

function Products({params}: {params:{id:number}}) {
    return (
        <div>

            <h1>
                Products {params.id}
            </h1>
        </div>
    );
}

export default Products