/**
 * Contact Modal Configuration
 * 
 * Switch between 'form' and 'info' to choose which contact modal opens
 * when users click "Contact" in the menu or "Contact Us" in the footer.
 * 
 * - 'form': Opens the contact form with First Name, Last Name, Email, and Message fields
 * - 'info': Opens the contact info overlay with phone and email (with bot protection)
 */

export type ContactModalType = 'form' | 'info';

export const CONTACT_MODAL_TYPE: ContactModalType = 'form';

// To switch to the info modal, change the above to:
// export const CONTACT_MODAL_TYPE: ContactModalType = 'info';

