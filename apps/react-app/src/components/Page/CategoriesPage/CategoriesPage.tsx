import { Grid } from '@mui/material';

import { PageContainer } from './CategoriesPage.styles';
import { useEffect, useState } from 'react';
import Table from '../../Table'

interface Category {
  name: string;
  id: number;
}

function CategoriesPage() {

   /* // ACT 6 - Create a state called "rows"  DONE*/
  const [rows, setRows] = useState<Category[]>([]);

  const category = [
    {name: 'First Category', id: 1},
    {name: 'Second Category', id: 2},
    {name: 'Third Category', id: 3},
    {name: 'Fourth Category', id: 4},
  ]

  /* // ACT 6 - Call setRows when the component is mounted for first time, use "categories"
      variable as new value.  DONE*/
      useEffect(() => {
        setRows(category)
      }, []);
      console.log(rows)


  /* // ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem" DONE*/
  const handleEditITem = () => {
    console.log('HANDLEITEM')
  }

  const handleDeleteItem = () => {
    console.log('HANDLEDELETEITEM')
  }
  return (
    <>
      {/* ACT 6 - Create a component called "Table" to display category names DONE*/}
      <PageContainer container>
        Categories Page
        <Grid item sx={{ justifyContent: 'flex-end', display: 'flex' }}>
          //Add category (Icon button)
        </Grid>
        <Table category={rows} />
        <Grid item sx={{ flexGrow: 1 }}>
          //Table
        </Grid>
        //Modal
      </PageContainer>
    </>
  );
}

export default CategoriesPage;
