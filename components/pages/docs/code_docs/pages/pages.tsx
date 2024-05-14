import Homepage from "./homepage/homepage";
import HomepageMenu from "./homepage/homepageMenu";
import NewItemPage from "./newItem/newItemPage";
import NewItemMenu from "./newItem/newItemMenu";
import StyledComponents from "./styledComponents/styledComponents";
import StyledcomponentsMenu from "./styledComponents/styledComponentsMenu";


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
    styledComponents: {
        title: 'Styled Components',
        page: <StyledComponents />,
        menu: <StyledcomponentsMenu />,
    },
} as const;

