# Parsing Wii Remote data

The Wii Remote sends us regular updates when it's state changes. But it will not tell us specificly _what_ change. I also don't plan to build out full functionality right away. So here's the plan.

1. Create functions to parse individual attributes from the buffer
2. Store the previous state
3. Compare the new state to the previous state
4. Emit events on changes, but pass in the new state for all buttons
