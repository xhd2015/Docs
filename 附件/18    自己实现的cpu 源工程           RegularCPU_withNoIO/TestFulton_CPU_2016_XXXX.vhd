--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   11:01:26 07/27/2016
-- Design Name:   
-- Module Name:   H:/RegularCPU_withNoIO/TestFulton_CPU_2016_XXXX.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: Fulton_CPU_2016_XXXX
-- 
-- Dependencies:
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
--
-- Notes: 
-- This testbench has been automatically generated using types std_logic and
-- std_logic_vector for the ports of the unit under test.  Xilinx recommends
-- that these types always be used for the top-level I/O of a design in order
-- to guarantee that the testbench will bind correctly to the post-implementation 
-- simulation model.
--------------------------------------------------------------------------------
LIBRARY ieee;
USE ieee.std_logic_1164.ALL;
 
-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--USE ieee.numeric_std.ALL;
 
ENTITY TestFulton_CPU_2016_XXXX IS
END TestFulton_CPU_2016_XXXX;
 
ARCHITECTURE behavior OF TestFulton_CPU_2016_XXXX IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT Fulton_CPU_2016_XXXX
    PORT(
         clk : IN  std_logic;
         reset : IN  std_logic;
         fakeIOdatain : IN  std_logic_vector(7 downto 0);
         fakeIOdataout : OUT  std_logic_vector(7 downto 0);
         maddrbus : OUT  std_logic_vector(15 downto 0);
         mdatabus : INOUT  std_logic_vector(15 downto 0);
         nMREQ : OUT  std_logic;
         nRD : OUT  std_logic;
         nWR : OUT  std_logic;
         nBHE : OUT  std_logic;
         nBLE : OUT  std_logic
        );
    END COMPONENT;
    

   --Inputs
   signal clk : std_logic := '0';
   signal reset : std_logic := '0';
   signal fakeIOdatain : std_logic_vector(7 downto 0) := (others => '0');

	--BiDirs
   signal mdatabus : std_logic_vector(15 downto 0);

 	--Outputs
   signal fakeIOdataout : std_logic_vector(7 downto 0);
   signal maddrbus : std_logic_vector(15 downto 0);
   signal nMREQ : std_logic;
   signal nRD : std_logic;
   signal nWR : std_logic;
   signal nBHE : std_logic;
   signal nBLE : std_logic;

   -- Clock period definitions
   constant clk_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: Fulton_CPU_2016_XXXX PORT MAP (
          clk => clk,
          reset => reset,
          fakeIOdatain => fakeIOdatain,
          fakeIOdataout => fakeIOdataout,
          maddrbus => maddrbus,
          mdatabus => mdatabus,
          nMREQ => nMREQ,
          nRD => nRD,
          nWR => nWR,
          nBHE => nBHE,
          nBLE => nBLE
        );

   -- Clock process definitions
   clk_process :process
   begin
		clk <= '0';
		wait for clk_period/2;
		clk <= '1';
		wait for clk_period/2;
   end process;
 

   -- Stimulus process
   stim_proc: process
   begin		
      -- hold reset state for 100 ns.
      wait for 100 ns;	
		
		reset<='1';
      wait for clk_period*10;
		reset<='0';
      -- insert stimulus here 

      wait;
   end process;

END;
