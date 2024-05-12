import Homepage from "./homepage/homepage";
import HomepageMenu from "./homepage/homepageMenu";
import NewItemPage from "./newItem/newItemPage";
import NewItemMenu from "./newItem/newItemMenu";
import References from "./references/references";
import ReferencesMenu from "./references/referencesMenu";

export const pages = {
    homepage: {
        title: 'Homepage',
        page: <Homepage />,
        menu: <HomepageMenu />,
    },
    newItemPage: {
        title: 'New Item',
        page: <NewItemPage />,
        menu: <NewItemMenu />,
    },
    references: {
        title: 'References',
        page: <References />,
        menu: <ReferencesMenu />,
    },
}



