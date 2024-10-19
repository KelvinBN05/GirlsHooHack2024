from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json

# Setup Selenium WebDriver
service = Service('/usr/local/bin/chromedriver')  # Update this path
driver = webdriver.Chrome(service=service)

# Navigate to the calendar URL
driver.get("https://www.virginia.edu/calendar")
time.sleep(3)  # Allow the page to load

# Function to scrape events grouped by dates
def scrape_events():
    all_events_data = []  # List to hold all event data

    # Wait for the topPart divs to be present
    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[contains(@class, 'topPart')]"))
        )
    except Exception as e:
        print(f"Error waiting for topPart elements: {e}")
        return []

    # Find all topPart divs on the page
    top_parts = driver.find_elements(By.XPATH, "//div[contains(@class, 'topPart')]")
    print(f"Found {len(top_parts)} topPart elements on this page.")

    # Iterate through each topPart element to extract data
    for top_part in top_parts:
        try:
            # Print the outer HTML for debugging
            print("TopPart HTML:", top_part.get_attribute('outerHTML'))

            # Find the anchor tag with the class 'twTitle'
            title_element = top_part.find_element(By.CLASS_NAME, 'twTitle')

            # Extract the event title
            title = title_element.text  # Gets the text inside the anchor tag

            # Extract additional attributes from the anchor tag
            event_url = title_element.get_attribute("href")  # Gets the href attribute
            event_id = title_element.get_attribute("url.eventid")  # Gets the event ID
            seo_title = title_element.get_attribute("url.seotitle")  # Gets the SEO title

            # Create the event document
            event_document = {
                "title": title,
                "event_url": event_url,
                "event_id": event_id,
                "seo_title": seo_title
            }
            all_events_data.append(event_document)  # Add to the list

        except Exception as e:
            print(f"Error extracting event data: {e}")

    return all_events_data

# Main scraping logic
all_events = []
while True:
    events_on_page = scrape_events()
    all_events.extend(events_on_page)  # Add events from the current page to the total list

    # Check if the "Next Page" button is available
    try:
        next_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "ctl04_ctl96_ctl00_lnk2NextPg"))  # Adjust ID based on actual element
        )
        print("Clicking on the next page button.")
        next_button.click()  # Click the "Next Page" button
        time.sleep(3)  # Wait for the next page to load
    except Exception as e:
        print("No more pages to navigate or error clicking button:", e)
        break  # Exit the loop if the "Next Page" button is not found or there are no more pages

# Save the events to a JSON file
with open('events_data.json', 'w') as f:
    json.dump(all_events, f, indent=4)

# Close the Selenium WebDriver
driver.quit()

print("Scraping completed and data stored in events_data.json.")