----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    14:08:36 07/24/2016 
-- Design Name: 
-- Module Name:    ClockManager - Behavioral 
-- Project Name: 
-- Target Devices: 
-- Tool versions: 
-- Description: 
--
-- Dependencies: 
--
-- Revision: 
-- Revision 0.01 - File Created
-- Additional Comments: 
--
----------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx primitives in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

----------------------------------WORKED WELL IF RESET------------------
entity ClockManager is
	port(clk,reset:in std_logic; 
			resetall:out std_logic;
			t1,t2,t3,t4:out std_logic);
end ClockManager;

architecture Behavioral of ClockManager is
signal t:std_logic_vector(3 downto 0);
begin
	
	resetall<=reset;
	
	
	process(clk,reset)
	begin
		if reset='1' then
			t1<='0';t2<='0';t3<='0';t4<='0';t(3 downto 0)<="0001";
		elsif rising_edge(clk) then
			t<=t(2 downto 0)&t(3);
			t1<=t(0);t2<=t(1);t3<=t(2);t4<=t(3);
		end if;
		
				
	end process;

end Behavioral;


