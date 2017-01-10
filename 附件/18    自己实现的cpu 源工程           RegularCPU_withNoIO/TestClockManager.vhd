--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   22:05:03 07/22/2016
-- Design Name:   
-- Module Name:   C:/Users/Fulton/ISE Project/RegularCPU/TestClockManager.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: ClockManager
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
 
ENTITY TestClockManager IS
END TestClockManager;
 
ARCHITECTURE behavior OF TestClockManager IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT ClockManager
    PORT(
         clk : IN  std_logic;
         reset : IN  std_logic;
			resetall:out std_logic;
         t1 : OUT  std_logic;
         t2 : OUT  std_logic;
         t3 : OUT  std_logic;
         t4 : OUT  std_logic
        );
    END COMPONENT;
    

   --Inputs
   signal clk : std_logic := '0';
   signal reset : std_logic := '0';

 	--Outputs
	signal resetall: std_logic;
   signal t1 : std_logic;
   signal t2 : std_logic;
   signal t3 : std_logic;
   signal t4 : std_logic;

   -- Clock period definitions
   constant clk_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: ClockManager PORT MAP (
          clk => clk,
          reset => reset,
			 resetall=>resetall,
          t1 => t1,
          t2 => t2,
          t3 => t3,
          t4 => t4
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

      wait for clk_period*10;
		reset<='1';
      -- insert stimulus here 
		 wait for clk_period*10;
		 reset<='0';
      wait;
   end process;

END;
