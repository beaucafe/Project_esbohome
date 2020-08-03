import React, { ReactElement } from 'react'
import Layout from 'components/layouts/alpha/layout'
import MaterialTable from 'material-table'

interface Props {}

export default function Setting({}: Props): ReactElement {
  return (
    <Layout>
      <MaterialTable
        columns={[
          { title: 'Action', field: 'action' },
          { title: 'ID(key)', field: 'dtkey' },
          { title: 'Code', field: 'doccode' },
          { title: 'Name(thai)', field: 'thainame' },
          { title: 'Name(eng)', field: 'engname' },
        ]}
        data={[
          {
            action: 'Mehmet',
            dtkey: 'Baran',
            doccode: 'Baran',
            thainame: 1987,
            engname: 63,
          },
        ]}
        title="Setting Document"
      />
    </Layout>
  )
}
