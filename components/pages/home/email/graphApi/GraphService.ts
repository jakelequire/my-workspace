import {
    Client,
    GraphRequestOptions,
    PageCollection,
    PageIterator,
} from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { endOfWeek, startOfWeek } from 'date-fns';
import { User, Event } from '@microsoft/microsoft-graph-types';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
    if (!graphClient) {
        console.log("[ensureClient] !graphClient authProvider: ", authProvider)
        graphClient = Client.initWithMiddleware({
            authProvider: authProvider,
        });
    } else {
        console.log("[ensureClient] graphClient authProvider: ", authProvider)
    }

    return graphClient;
}

export async function getUser(
    authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<User> {
    ensureClient(authProvider);

    // Return the /me API endpoint result as a User object
    const user: User = await graphClient!
        .api('/me')
        // Only retrieve the specific fields needed
        .select('displayName,mail,mailboxSettings,userPrincipalName')
        .get()
        .then((res) => {
            console.log("[GraphService] getUser res: ", res)
            return res;
        }).catch((err) => {
            console.log("[GraphService] getUser err: ", err)
            return err;
        });
    return user;
}
// </GetUserSnippet>



/* -------------------------------------------------------------------------- */

// <GetUserWeekCalendarSnippet>
export async function getUserWeekCalendar(
    authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    timeZone: string
): Promise<Event[]> {
    ensureClient(authProvider);

    // Generate startDateTime and endDateTime query params
    // to display a 7-day window
    const now = new Date();
    const startDateTime = startOfWeek((now), ).toISOString();
    const endDateTime = endOfWeek(timeZone).toISOString();

    // GET /me/calendarview?startDateTime=''&endDateTime=''
    // &$select=subject,organizer,start,end
    // &$orderby=start/dateTime
    // &$top=50
    var response: PageCollection = await graphClient!
        .api('/me/calendarview')
        .header('Prefer', `outlook.timezone="${timeZone}"`)
        .query({ startDateTime: startDateTime, endDateTime: endDateTime })
        .select('subject,organizer,start,end')
        .orderby('start/dateTime')
        .top(25)
        .get();

    if (response['@odata.nextLink']) {
        // Presence of the nextLink property indicates more results are available
        // Use a page iterator to get all results
        var events: Event[] = [];

        // Must include the time zone header in page
        // requests too
        var options: GraphRequestOptions = {
            headers: { Prefer: `outlook.timezone="${timeZone}"` },
        };

        var pageIterator = new PageIterator(
            graphClient!,
            response,
            (event) => {
                events.push(event);
                return true;
            },
            options
        );

        await pageIterator.iterate();

        return events;
    } else {
        return response.value;
    }
}
// </GetUserWeekCalendarSnippet>

// <CreateEventSnippet>
export async function createEvent(
    authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    newEvent: Event
): Promise<Event> {
    ensureClient(authProvider);

    // POST /me/events
    // JSON representation of the new event is sent in the
    // request body
    return await graphClient!.api('/me/events').post(newEvent);
}
// </CreateEventSnippet>
